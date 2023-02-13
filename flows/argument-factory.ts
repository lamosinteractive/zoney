import {FlowParameter} from "../types/flow-parameter";
import {FlowParameterConfig} from "./action-factory";

export default class ArgumentFactory {
    public get(args: FlowParameterConfig[]) {
        return args.map(arg => {
            const data = this.getData(arg)
            Object.assign(data, arg.extra)
            return data;
        })
    }

    private getData(arg: FlowParameterConfig) {
        switch (arg.id) {
            case FlowParameter.bool:
                return this.getBool()
            case FlowParameter.number:
                return this.getNumber()
            case FlowParameter.zone:
                return this.getZone()
        }

        throw new Error(`[ArgumentFactory] Unable to process ${arg}`)
    }

    private getBool = () => (    {
        type: "boolean",
        name: "bool",
        title: { "en": "Bool" },
        placeholder: { "en": "true" }
    })

    private getNumber = () => (    {
        type: "number",
        name: "number",
        title: { "en": "Number" },
        placeholder: { "en": "1" }
    })

    private getZone = () => (    {
        type: "autocomplete",
        name: "zone",
        title: { "en": "Zone" },
        placeholder: { "en": "Livingroom" }
    })
}
