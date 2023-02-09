import Homey from 'homey';
import { HomeyAPI } from 'athom-api';

class ZoneyLightDriver extends Homey.Driver {
  private _zones: HomeyAPI.ManagerZones.Zone[] = [];

  /**
   * onInit is called when the driver is initialized.
   */
  async onInit() {
    this.log('MyDriver has been initialized');

    const api = await HomeyAPI.forCurrentHomey(this.homey);

    this._zones = Object.values(await api.zones.getZones())


  }

  /**
   * onPairListDevices is called when a user is adding a device and the 'list_devices' view is called.
   * This should return an array with the data of devices that are available for pairing.
   */
  async onPairListDevices() {
    this.log('onPairListDevices')

    const zoneIds = this.getDevices().map(x => x.getStoreValue('zone'));
    const filtered = this._zones.filter(x => !zoneIds.includes(x.id))

    this.log(zoneIds)
    this.log(filtered)

    return [
      ...filtered.map(zone => {
        return {
          name: `${zone.name} Light Zoney`,
          data: {
            id: `zoney-lights-${zone.id}`
          },
          store: {
            zone: zone.id,
          },
        }
      })
    ];
  }

}

module.exports = ZoneyLightDriver;
