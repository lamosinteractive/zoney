import {HomeyAPI} from "athom-api";
import {Capability} from "../types/capabilities";
import {FlowParameter} from "../types/flow-parameter";
import {Class} from "../types/classes";
import Helpers from "../classes/helpers";
import DeviceContext from "../classes/device-context";

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
        const context = new DeviceContext(devices);

        const value = this.getValue(args, context);

        context.setCapability(capability, value)
    }

    public getId(): string {
        return this._id;
    }

    public abstract getArguments(): FlowParameter[];

    protected abstract getCapability(args: TArgs, state: any): Capability;

    protected abstract getValue(args: TArgs, context: DeviceContext): any;

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

    protected getValue(args: GenericZoneArguments, context: DeviceContext): any {
        return args.number
    }
}

type ZoneClassBoolFlowArguments = {
    zone: Argument<string>,
    class: Argument<string>,
}

export class ZoneClassBoolFlow extends FlowBase<ZoneClassBoolFlowArguments> {
    private _value: boolean;
    private _capability: Capability;

    constructor(id: string, capability: Capability, value: boolean) {
        super(id);
        this._value = value;
        this._capability = capability;
    }

    protected filterDevices(devices: HomeyAPI.ManagerDevices.Device[], args: ZoneClassBoolFlowArguments, state: any): HomeyAPI.ManagerDevices.Device[] {
        return devices
            .filter(x => x.zone === args.zone.id)
            .filter(x => x.class === args.class.id);
    }

    getArguments(): FlowParameter[] {
        return [
            FlowParameter.zone,
            FlowParameter.class,
        ];
    }

    protected getCapability(args: ZoneClassBoolFlowArguments, state: any): Capability {
        return this._capability;
    }

    protected getValue(args: ZoneClassBoolFlowArguments, context: DeviceContext): any {
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

    protected getValue(args: ZoneLightOnSmartArguments, context: DeviceContext): any {
        if (context.allOn()) {
            return 1;
        }

        return 0.7;
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

    protected getValue(args: DeviceLightOnSmartArguments, context: DeviceContext): any {
        if (!context.allOn()) {
            return 0.7;
        }

        if (context.allAtLeast(Capability.dim, 0.7)) {
            return 1;
        }

        return 0.7;
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

    protected getValue(args: DeviceLightToggleSmartArguments, context: DeviceContext): any {
        if (!context.allOn()) {
            return 0.7;
        }

        return 0;
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

    protected getValue(args: ZoneLightDimFlowArguments, context: DeviceContext): any {
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

    protected getValue(args: ZoneLightDimRelativeFlowArguments, context: DeviceContext): any {
        const value = context.getAverage(Capability.dim) + this._value;

        return Helpers.clamp(value, 0, 1)
    }
}
