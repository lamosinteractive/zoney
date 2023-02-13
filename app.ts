import Homey from 'homey';
import {HomeyAPI} from "athom-api";
import FlowHandler from "./classes/flow-handler";
import {
  DeviceLightOnSmartFlow,
  DeviceLightToggleSmartFlow,
  SetZoneNumberFlow,
  ZoneClassBoolFlow,
  ZoneLightDimFlow,
  ZoneLightDimRelativeFlow,
  ZoneLightOnSmartFlow
} from "./flows/flow-base";
import {Capability} from "./types/capabilities";

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');

    const api = await HomeyAPI.forCurrentHomey(this.homey);

    const flows = new FlowHandler(this, api)

    // Generic
    flows.register(new ZoneClassBoolFlow('zoney-class-on', Capability.onoff, true))
    flows.register(new ZoneClassBoolFlow('zoney-class-off', Capability.onoff, false))

    // Lights
    // flows.register(new ZoneClassBoolFlow('zoney-light-on', Class.light, true))
    // flows.register(new ZoneClassBoolFlow('zoney-light-off', Class.light, false))
    flows.register(new SetZoneNumberFlow('zoney-zone-set-number'))
    flows.register(new ZoneLightOnSmartFlow())
    flows.register(new ZoneLightDimFlow('zoney-light-on-max', 1))
    flows.register(new DeviceLightOnSmartFlow())
    flows.register(new ZoneLightDimRelativeFlow('zoney-light-dim', -0.2))
    flows.register(new ZoneLightDimRelativeFlow('zoney-light-brighten', 0.2))
    flows.register(new DeviceLightToggleSmartFlow())

    // Heaters
    // flows.register(new ZoneClassBoolFlow('zoney-heater-on', Class.heater, true))
    // flows.register(new ZoneClassBoolFlow('zoney-heater-off', Class.heater, false))
  }
}

module.exports = MyApp;
