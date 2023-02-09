import {
    AverageCapabilityCollection, BoolAllCapabilityCollection,
    BoolAnyCapabilityCollection,
    CapabilityCollectionBase,
    SumCapabilityCollection
} from "./capability-collection";
import Homey from "homey";

export default class CapabilityCollectionFactory {
    getCollection(device: Homey.Device, capability: string): CapabilityCollectionBase<any> {
        switch (capability) {
            case 'onoff':
            case 'speaker_playing':
            case 'speaker_next':
            case 'speaker_prev':
            case 'speaker_shuffle':
                return new BoolAnyCapabilityCollection(device, capability);
            case 'locked':
                return new BoolAllCapabilityCollection(device, capability);
            case 'dim':
            case 'light_hue':
            case 'light_saturation':
            case 'light_temperature':
            case 'speaker_duration':
            case 'speaker_position':
                return new AverageCapabilityCollection(device, capability);
            case 'measure_power':
            case 'meter_power':
                return new SumCapabilityCollection(device, capability);
        }

        throw new Error(`Unsupported capability: ${capability}`)
    }
}