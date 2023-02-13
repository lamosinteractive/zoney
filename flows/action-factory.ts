import Config, {ConfigClasses} from "./config";
import {FlowParameter} from "../types/flow-parameter";
import {ValueType} from "../types/value-type";
import {Capability} from "../types/capabilities";
import {Class} from "../types/classes";

export class ActionConfig {
    id!: string
    title!: string
    titleFormatted!: string
    type!: ValueType
    capability!: Capability
    classType!: Class
    args: FlowParameterConfig[] = []

    constructor(init: Required<ActionConfig>) {
        Object.assign(this, init)
    }
}

export type FlowParameterConfig = {
    id: FlowParameter,
    extra?: object
}

export default class ActionFactory {
    private _classes: ConfigClasses;

    constructor() {
        this._classes = new Config().classes;
    }

    public getActions(): ActionConfig[] {
        return [
            ...this.getBooleanActions(),
            ...this.getNumberActions(),
        ]
    }

    private getBooleanActions() {
        const capabilities: ActionConfig[] = [];

        Object.keys(this._classes).forEach((classType) => {
            this._classes[classType].filter(x => x.setable && x.type == 'boolean').forEach(settings => {
                capabilities.push(new ActionConfig({
                    args: [
                        {
                            id: FlowParameter.zone
                        },
                        {
                            id: FlowParameter.bool,
                        },
                    ],
                    capability: settings.id as unknown as Capability,
                    classType: classType as unknown as Class,
                    id: `zoney-generated-set-${classType}-${settings.id}`,
                    title: `Set ${classType} ${settings.title} in zone`,
                    titleFormatted: `Set ${classType} ${settings.title} to [[bool]] in [[zone]]`,
                    type: settings.type,
                }))
            })
        })

        return capabilities;
    }

    private getNumberActions() {
        const capabilities: ActionConfig[] = [];

        Object.keys(this._classes).forEach((classType) => {
            this._classes[classType].filter(x => x.setable && x.type == 'number').forEach(settings => {
                capabilities.push(new ActionConfig({
                    args: [
                        {
                            id: FlowParameter.zone
                        },
                        {
                            id: FlowParameter.number,
                            extra: {
                                decimals: settings.decimals,
                                min: settings.min,
                                max: settings.max
                            }
                        },
                    ],
                    capability: settings.id as unknown as Capability,
                    classType: classType as unknown as Class,
                    id: `zoney-generated-set-${classType}-${settings.id}`,
                    title: `Set ${classType} ${settings.title} in zone`,
                    titleFormatted: `Set ${classType} ${settings.title} to [[number]] in [[zone]]`,
                    type: settings.type,
                }))
            })
        })

        return capabilities;
    }
}
