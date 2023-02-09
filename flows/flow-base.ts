import {HomeyAPI} from "athom-api";
import {Capability} from "../types/capabilities";
import {FlowParameter} from "../types/flow-parameter";
import {Class} from "../types/classes";
import Device = HomeyAPI.ManagerDevices.Device;

export abstract class FlowBase<TArgs> {
    private _api!: HomeyAPI;
    private _id: string;
    private log!: (x: any) => void;

    constructor(id: string) {
        this._id = id;
    }

    public init(api: HomeyAPI, log: (x: any) => void) {
        this._api = api;
        this.log = log;
    }

    public async runListener(args: TArgs, state: any) {
        const capability = this.getCapability(args, state)

        const devices = this.filterDevices(Object.values(await this._api.devices.getDevices()), args, state)
        const capabilityDevices = devices.filter(x => x.capabilities.includes(capability));

        const value = this.getValue(args, this.everythingExceptZoney(capabilityDevices));

        const instances = this.getZoneyOrAll(capabilityDevices).map(x => {
            return x.makeCapabilityInstance(capability, () => {})
        })

        for (let instance of instances) {
            instance.setValue(value)
            instance.destroy()
        }
    }

    private getZoneyOrAll(devices: Device[]): Device[] {
        const zoney = devices.find(x => x.driverId.includes('zoney'))

        return !!zoney ? [zoney] : devices
    }

    private everythingExceptZoney(devices: Device[]): Device[]  {
        return devices.filter(x => !x.driverId.includes('zoney'))
    }

    public getId(): string {
        return this._id;
    }

    protected getCapabilityValue(device: Device, capability: Capability): any {
        // @ts-ignore
        return device.capabilitiesObj[capability].value
    }

    public abstract getArguments(): FlowParameter[];

    protected abstract getCapability(args: TArgs, state: any): Capability;

    protected abstract getValue(args: TArgs, instances: HomeyAPI.ManagerDevices.Device[]): any;

    protected abstract filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: TArgs, state: any): HomeyAPI.ManagerDevices.Device[];
}

export type Argument<T> = { name: string, id: T }

type GenericZoneArguments = {
    capability: Argument<Capability>,
    zone: Argument<string>,
    number: number
}

export class SetZoneNumberFlow extends FlowBase<GenericZoneArguments> {
    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: GenericZoneArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices.filter(x => x.zone === args.zone.id);
    }

    getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
            FlowParameter.number,
            FlowParameter.capability
        ];
    }

    protected getCapability(args: GenericZoneArguments, state: any): Capability {
        return args.capability.id;
    }

    protected getValue(args: GenericZoneArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        return args.number
    }
}

type ZoneClassBoolFlowArguments = {
    zone: Argument<string>,
}

export class ZoneClassBoolFlow extends FlowBase<ZoneClassBoolFlowArguments> {
    private _classType: Class;
    private _value: boolean;

    constructor(id: string, classType: Class, value: boolean) {
        super(id);
        this._classType = classType;
        this._value = value;
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: ZoneClassBoolFlowArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === this._classType);
    }

    getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
        ];
    }

    protected getCapability(args: ZoneClassBoolFlowArguments, state: any): Capability {
        return Capability.onoff;
    }

    protected getValue(args: ZoneClassBoolFlowArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        return this._value;
    }
}

type ZoneLightOnSmartArguments = {
    zone: Argument<string>,
}


export class ZoneLightOnSmartFlow extends FlowBase<ZoneLightOnSmartArguments> {
    constructor() {
        super('zoney-light-on-smart');
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: ZoneLightOnSmartArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === Class.light);
    }

    public getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
        ];
    }

    protected getCapability(args: ZoneLightOnSmartArguments, state: any): Capability {
        return Capability.dim;
    }

    protected getValue(args: ZoneLightOnSmartArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        if (this.allOn(devices)) {
            return 1;
        }

        return 0.7;
    }

    private allOn(devices: HomeyAPI.ManagerDevices.Device[]) {
        for (let device of devices) {
            if (this.getCapabilityValue(device, Capability.dim) === 0)
                return false;
        }

        return true;
    }
}

type DeviceLightOnSmartArguments = {
    device_light: Argument<string>,
}


export class DeviceLightOnSmartFlow extends FlowBase<DeviceLightOnSmartArguments> {
    constructor() {
        super('zoney-device-light-on-smart');
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: DeviceLightOnSmartArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.id === args.device_light.id);
    }

    public getArguments(): FlowParameter[] {
        return [
            FlowParameter.device_light,
        ];
    }

    protected getCapability(args: DeviceLightOnSmartArguments, state: any): Capability {
        return Capability.dim;
    }

    protected getValue(args: DeviceLightOnSmartArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        if (this.allOnTarget(devices, 0.7)) {
            return 1;
        }

        return 0.7;
    }

    private allOnTarget(devices: HomeyAPI.ManagerDevices.Device[], target: number) {
        for (let device of devices) {
            if (this.getCapabilityValue(device, Capability.onoff) === false)
                return false;

            if (this.getCapabilityValue(device, Capability.dim) < target)
                return false;
        }

        return true;
    }
}

type DeviceLightToggleSmartArguments = {
    zone: Argument<string>,
}

export class DeviceLightToggleSmartFlow extends FlowBase<DeviceLightToggleSmartArguments> {
    constructor() {
        super('zoney-light-toggle-smart');
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: DeviceLightToggleSmartArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === Class.light);
    }

    public getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
        ];
    }

    protected getCapability(args: DeviceLightToggleSmartArguments, state: any): Capability {
        return Capability.dim;
    }

    protected getValue(args: DeviceLightToggleSmartArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        if (!this.allOn(devices)) {
            return 0.7;
        }

        return 0;
    }

    private allOn(devices: HomeyAPI.ManagerDevices.Device[]) {
        for (let device of devices) {
            if (this.getCapabilityValue(device, Capability.dim) === 0)
                return false;
        }

        return true;
    }
}


type ZoneLightDimFlowArguments = {
    zone: Argument<string>,
}


export class ZoneLightDimFlow extends FlowBase<ZoneLightDimFlowArguments> {
    private _value: number;

    constructor(id: string, value: number) {
        super(id);
        this._value = value;
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: ZoneLightDimFlowArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === Class.light);
    }

    public getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
        ];
    }

    protected getCapability(args: ZoneLightDimFlowArguments, state: any): Capability {
        return Capability.dim;
    }

    protected getValue(args: ZoneLightDimFlowArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        return this._value
    }
}

type ZoneLightDimRelativeFlowArguments = {
    zone: Argument<string>,
}


export class ZoneLightDimRelativeFlow extends FlowBase<ZoneLightDimRelativeFlowArguments> {
    private _value: number;

    constructor(id: string, value: number) {
        super(id);
        this._value = value;
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: ZoneLightDimRelativeFlowArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === Class.light);
    }

    public getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
        ];
    }

    protected getCapability(args: ZoneLightDimRelativeFlowArguments, state: any): Capability {
        return Capability.dim;
    }

    protected getValue(args: ZoneLightDimRelativeFlowArguments, devices: HomeyAPI.ManagerDevices.Device[]): any {
        const value = this.getAverage(devices) + this._value;

        return this.clamp(value, 0, 1)
    }

    private getAverage(devices: HomeyAPI.ManagerDevices.Device[]): number {
        const values = Object.values(devices).map(x => this.getCapabilityValue(x, Capability.dim))

        return values.reduce((a, b) => a + b, 0) / values.length;
    }

    private clamp(value: number, min: number, max: number) {
        if (value < min)
            return min;

        if (value > max)
            return max;

        return value
    }
}
