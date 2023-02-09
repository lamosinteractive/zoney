import {HomeyAPI} from "athom-api";
import Homey from "homey";

export abstract class CapabilityCollectionBase<T> {
    protected _devices: { [key: string]: HomeyAPI.ManagerDevices.Device.CapabilityInstance } = {}
    private _capability: string;
    private _device: Homey.Device;

    constructor(device: Homey.Device, capability: string) {
        this._capability = capability;
        this._device = device;
    }

    public clear() {
        for (let value of Object.values(this._devices)) {
            value.destroy()
        }

        this._devices = {}
    }

    public register(device: HomeyAPI.ManagerDevices.Device) {
        let id = device.id;

        this._devices[id] = device.makeCapabilityInstance(
            this._capability,
            (...args) => {
                this.capabilityCallback(this._capability)
            }
        );
    }

    private capabilityCallback(capability: string) {
        const value = this.getValue();

        this._device.log(`${capability}: ${value}`)
        this._device.setCapabilityValue(capability, value)
    }

    protected applyValue(value: any) {
        for (let id of Object.keys(this._devices)) {
            const device = this._devices[id]
            try {
                device.setValue(value)
            } catch (e) {
                this._device.log(`Error setting ${this._capability} on ${id}`);
                this._device.log(e);
            }
        }
    }

    public abstract getValue(): T;
    public abstract setValue(value: any): void;
}

export class AverageCapabilityCollection extends CapabilityCollectionBase<number> {
    public getValue(): number {
        const values = Object.values(this._devices).map(x => x.value)

        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    setValue(value: any) {
        this.applyValue(value)
    }
}

export class SumCapabilityCollection extends CapabilityCollectionBase<number> {
    public getValue(): number {
        const values = Object.values(this._devices).map(x => x.value)

        return values.reduce((a, b) => a + b, 0);
    }

    setValue(value: any) {
        this.applyValue(value)
    }
}

export class BoolAnyCapabilityCollection extends CapabilityCollectionBase<boolean> {
    public getValue(): boolean {
        for (let device of Object.values(this._devices)) {
            if (!!device.value)
                return true;
        }

        return false;
    }

    setValue(value: any) {
        this.applyValue(value)
    }
}
export class BoolAllCapabilityCollection extends CapabilityCollectionBase<boolean> {
    public getValue(): boolean {
        for (let device of Object.values(this._devices)) {
            if (!device.value)
                return false;
        }

        return true;
    }

    setValue(value: any) {
        this.applyValue(value)
    }
}
