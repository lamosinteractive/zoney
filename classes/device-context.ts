import {HomeyAPI} from "athom-api";
import {Capability} from "../types/capabilities";
import Device = HomeyAPI.ManagerDevices.Device;

export default class DeviceContext {
    private _devices: HomeyAPI.ManagerDevices.Device[];
    private _zoneys: { [key: string]: Device | null } = {};
    private _capabilities: { [key: string]: Device[] } = {}

    constructor(devices: Device[]) {
        this._devices = devices;
    }

    public getDevices() {
        return this._devices;
    }

    public getCapabilityValue(device: Device, capability: Capability): any {
        // @ts-ignore
        return device.capabilitiesObj[capability].value
    }

    public getCapabilityDevices(capability: Capability): Device[] {
        if (!this._capabilities[capability]) {
            const devices = this._devices.filter(x => x.capabilities);
            this._capabilities[capability] = devices.filter(x => !x.driverId.includes('zoney'));
            this._zoneys[capability] = devices.find(x => x.driverId.includes('zoney')) ?? null;
        }

        return this._capabilities[capability]
    }

    public getCapabilityDevicesOrZoney(capability: Capability): Device[] {
        if (this._zoneys[capability]) {
            return [this._zoneys[capability]!]
        }

        return this.getCapabilityDevices(capability)
    }

    public getAverage(capability: Capability): number {
        const values = this._devices.map(x => this.getCapabilityValue(x, capability))

        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    public allOn() {
        for (let device of this.getCapabilityDevices(Capability.onoff)) {
            if (!this.getCapabilityValue(device, Capability.onoff))
                return false;
        }

        return true;
    }

    public allAtLeast(capability: Capability, target: number) {
        for (let device of this.getCapabilityDevices(Capability.dim)) {
            if (this.getCapabilityValue(device, Capability.dim) < target)
                return false;
        }

        return true;
    }

    public setCapability(capability: Capability, value: any) {
        const devices = this.getCapabilityDevicesOrZoney(capability)

        const instances = devices.map(x => {
            return x.makeCapabilityInstance(capability, () => {})
        })

        for (let instance of instances) {
            instance.setValue(value)
            instance.destroy()
        }
    }
}
