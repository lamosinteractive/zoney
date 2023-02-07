import Homey from 'homey';
import CapabilityManager from "../../classes/capability-manager";
import {HomeyAPI} from "athom-api";

class ZoneyLight extends Homey.Device {
  private _capabilityManager!: CapabilityManager;

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const zone = this.getStoreValue('zone')

    this.log(`ZoneyLight has been initialized (${zone})`);

    const capabilities = ["dim", "onoff", "light_hue", "light_saturation", "light_temperature"];

    this._capabilityManager = new CapabilityManager(this, capabilities);

    const api = await HomeyAPI.forCurrentHomey(this.homey);
    const allDevices = Object.values(await api.devices.getDevices());
    const lights = allDevices.filter(x => x.class === 'light' && !x.driverUri.includes('devicegroups') && !x.driverUri.includes('zoney'))

    const lightsInZone = lights.filter(x => x.zone === zone);

    lightsInZone.forEach(light => {
      this._capabilityManager.register(light)
    })

    await this.syncCapabilities();

    this.log(`Using capabilities: ${this._capabilityManager.getCapabilities().join(", ")}`)

    for (let capability of this._capabilityManager.getCapabilities()) {
      this.registerCapabilityListener(capability, (value, opts) => {
        this._capabilityManager.setValue(capability, value)
      })
    }
  }

  private async syncCapabilities() {
    const used = this._capabilityManager.getCapabilities();
    const onDevice = this.getCapabilities();

    const missing = used.filter(x => !onDevice.includes(x))
    const unused = onDevice.filter(x => !used.includes(x))

    for (let capability of missing) {
      await this.addCapability(capability)
    }

    for (let capability of unused) {
      await this.removeCapability(capability)
    }
  }

  /**
   * onAdded is called when the user adds the device, called just after pairing.
   */
  async onAdded() {
    this.log('MyDevice has been added');
  }

  /**
   * onSettings is called when the user updates the device's settings.
   * @param {object} event the onSettings event data
   * @param {object} event.oldSettings The old settings object
   * @param {object} event.newSettings The new settings object
   * @param {string[]} event.changedKeys An array of keys changed since the previous version
   * @returns {Promise<string|void>} return a custom message that will be displayed
   */
  async onSettings({ oldSettings: {}, newSettings: {}, changedKeys: [] }): Promise<string|void> {
    this.log('MyDevice settings where changed');
  }

  /**
   * onRenamed is called when the user updates the device's name.
   * This method can be used this to synchronise the name to the device.
   * @param {string} name The new name
   */
  async onRenamed(name: string) {
    this.log('MyDevice was renamed');
  }

  /**
   * onDeleted is called when the user deleted the device.
   */
  async onDeleted() {
    this.log('MyDevice has been deleted');
  }

}

module.exports = ZoneyLight;
