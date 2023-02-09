import Homey from 'homey';
import CapabilityManager from "../../classes/capability-manager";
import {HomeyAPI} from "athom-api";

class ZoneySocket extends Homey.Device {
  private _capabilityManager!: CapabilityManager;
  private _api!: HomeyAPI;

  /**
   * onInit is called when the device is initialized.
   */
  async onInit() {
    const zone = this.getStoreValue('zone')

    this.log(`ZoneyLight has been initialized (${zone})`);

    const capabilities = ["onoff", "dim", "locked"];

    this._api = await HomeyAPI.forCurrentHomey(this.homey);

    this._capabilityManager = new CapabilityManager(this, capabilities);

    await this.initializeCapabilities();

    for (let capability of capabilities) {
      this.registerCapabilityListener(capability, (value, opts) => {
        this._capabilityManager.setValue(capability, value)
      })
    }

    this.registerCapabilityListener('button.sync', async () => {
      this.log(`Sync was pressed! ${this.getName()}`)
      await this.initializeCapabilities();
    });
  }

  private async initializeCapabilities() {
    await this._capabilityManager.init(this._api, 'socket')
    await this.syncCapabilities();

    this.log(`Using capabilities: ${this._capabilityManager.getCapabilities().join(", ")}`)
  }

  private async syncCapabilities() {
    const used = this._capabilityManager.getCapabilities();
    const onDevice = this.getCapabilities();

    // Make sure the maintenance button is present
    used.push('button.sync')

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

module.exports = ZoneySocket;
