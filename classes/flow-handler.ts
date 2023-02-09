import ManagerFlow from "homey/manager/flow";
import {Argument, FlowBase} from "../flows/flow-base";
import {FlowParameter} from "../types/flow-parameter";
import {App, FlowCardAction} from "homey";
import {HomeyAPI} from "athom-api";
import {Capability} from "../types/capabilities";
import {Class} from "../types/classes";

export default class FlowHandler {
    private _manager: ManagerFlow;
    private _api: HomeyAPI;
    private _zones: Argument<string>[] = [];
    private _capabilities: Argument<string>[] = [];
    private _app: App;

    constructor(app: App, api: HomeyAPI) {
        this._app = app;
        this._manager = app.homey.flow;
        this._api = api;

        this.init()
    }

    private async init() {
        this._zones = Object.values(await this._api.zones.getZones()).map(x => ({
            name: x.name.toLowerCase(),
            id: x.id
        }));

        this._capabilities = Object.values(Capability).map(x => ({
            name: x,
            id: x
        }))
    }

    public register(flow: FlowBase<any>) {
        this._app.log(`Register flow: ${flow.getId()}`)

        flow.init(this._api, (x) => this._app.log(x))

        const card = this._manager.getActionCard(flow.getId());

        card.registerRunListener((args, state) => flow.runListener(args, state))
        this.registerAutoCompleteHandlers(flow, card)
    }

    private registerAutoCompleteHandlers(flow: FlowBase<any>, card: FlowCardAction) {
        if (flow.getArguments().includes(FlowParameter.zone))
            card.registerArgumentAutocompleteListener(FlowParameter.zone, (query, args) => this.autocompleteZone(query, args))

        if (flow.getArguments().includes(FlowParameter.capability))
            card.registerArgumentAutocompleteListener(FlowParameter.capability, (query, args) => this.autocompleteCapability(query, args))

        if (flow.getArguments().includes(FlowParameter.device))
            card.registerArgumentAutocompleteListener(FlowParameter.device, (query, args) => this.autocompleteDevice(query, args))

        if (flow.getArguments().includes(FlowParameter.device_light))
            card.registerArgumentAutocompleteListener(FlowParameter.device_light, (query, args) => this.autocompleteDeviceClass(query, args, Class.light))

    }
    private async autocompleteZone(query: string, args: any) {
        return this._zones.filter((zone) => {
            return zone.name.toLowerCase().includes(query.toLowerCase());
        });
    }

    private async autocompleteCapability(query: string, args: any) {
        return this._capabilities.filter(x => x.id.includes(query.toLowerCase()))
    }

    private async autocompleteDevice(query: string, args: any) {
        const devices = Object.values(await this._api.devices.getDevices()).map(x => ({
            name: x.name,
            id: x.id
        }))

        return devices.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    }

    private async autocompleteDeviceClass(query: string, args: any, classType: Class) {
        const devices = Object.values(await this._api.devices.getDevices()).filter(x => x.class === classType).map(x => ({
            name: x.name,
            id: x.id
        }))

        return devices.filter(x => x.name.toLowerCase().includes(query.toLowerCase()))
    }
}