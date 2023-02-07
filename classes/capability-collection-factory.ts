import {AverageCapabilityCollection, BoolCapabilityCollection, CapabilityCollectionBase} from "./capability-collection";
import Homey from "homey";

export default class CapabilityCollectionFactory {
    getCollection(device: Homey.Device, capability: string): CapabilityCollectionBase<any> {
        switch (capability) {
            case 'onoff':
                return new BoolCapabilityCollection(device, capability);
            case 'dim':
            case 'light_hue':
            case 'light_saturation':
            case 'light_temperature':
                return new AverageCapabilityCollection(device, capability);
        }

        throw new Error(`Unsupported capability: ${capability}`)
    }
}