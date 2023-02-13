import {Capability} from "../types/capabilities";
import Config from "./config";
import {Class} from "../types/classes";

export default class CapabilityClassFactory {
    public get() {
        const classes = new Config().classes;

        const capabilities: { [key: string]: Class[] } = {}

        Object.values(Capability).forEach(x => capabilities[x] = [])

        for (let classesKey in classes) {
            classes[classesKey].forEach(x => {
                capabilities[x.id].push(classesKey as unknown as Class)
            })
        }

        return capabilities;
    }
}