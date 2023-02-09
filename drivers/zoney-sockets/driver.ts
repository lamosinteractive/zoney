import Homey from 'homey';
import { HomeyAPI } from 'athom-api';

class ZoneySocketDriver extends Homey.Driver {
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

    return [
      ...this._zones.map(zone => {
        return {
          name: `${zone.name} Socket Zoney`,
          data: {
            id: `zoney-sockets-${zone.id}`
          },
          store: {
            zone: zone.id,
          },
        }
      })
    ];
  }

}

module.exports = ZoneySocketDriver;
