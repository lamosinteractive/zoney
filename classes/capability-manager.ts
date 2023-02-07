import Homey from "homey";
import { HomeyAPI } from 'athom-api';
import {CapabilityCollectionBase} from "./capability-collection";
import CapabilityCollectionFactory from "./capability-collection-factory";

export default class CapabilityManager {
    private _capabilities: { [key: string]: CapabilityCollectionBase<any> } = {}
    private _aggregatedDevice: Homey.Device;
    private _allowedCapabilities: string[] = [];

    constructor(device: Homey.Device, allowedCapabilities: string[]) {
        this._aggregatedDevice = device;
        this._allowedCapabilities = allowedCapabilities;
    }

    public getCapabilities(): string[] {
        return Object.keys(this._capabilities)
    }

    public register(device: HomeyAPI.ManagerDevices.Device) {
        this._aggregatedDevice.log(`Registering: ${device.name}`)

        device.capabilities
            .filter(x => this._allowedCapabilities.includes(x))
            .forEach(capability => {
                this.registerCapability(device, capability)
            })
    }

    private registerCapability(device: HomeyAPI.ManagerDevices.Device, capability: string) {
        if (!this._capabilities[capability]) {
            this._aggregatedDevice.log(`registerCapability: creating ${capability}`)
            // @ts-ignore
            this._capabilities[capability] = new CapabilityCollectionFactory().getCollection(this._aggregatedDevice, capability)
        }

        this._aggregatedDevice.log(`registerCapability: ${!!this._capabilities}`)
        this._capabilities[capability].register(device)
    }

    public setValue(capability: string, value: any) {
        this._capabilities[capability].setValue(value)
    }
}
