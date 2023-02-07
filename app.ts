import Homey from 'homey';
import {HomeyAPI} from "athom-api";

class MyApp extends Homey.App {

  /**
   * onInit is called when the app is initialized.
   */
  async onInit() {
    this.log('MyApp has been initialized');

    const api = await HomeyAPI.forCurrentHomey(this.homey);
    const allDevices = Object.values(await api.devices.getDevices());
    const btns = allDevices.filter(x => x.class === 'remote' && !x.driverUri.includes('devicegroups') && !x.driverUri.includes('zoney'))

    const btnIds = btns.map(x => x.id)

    btns.forEach(btn => {
    })


    const tokens = await api.flowToken.getFlowTokens()

    const btnTokens = Object.values(tokens).filter(x => btnIds.includes(x.uriObj.id))

    this.log(btnTokens)

    // const triggers = await api.flow.getFlowCardTriggers()
    //
    // const btnTriggers = triggers.filter(x => btnIds.includes(x.uriObj.id))

    // const test = this.homey.flow.getDeviceTriggerCard('on')
    // console.log(test)


    // let folders = await api.flow.getFlowFolders()
    // let folder = folders['test-folder']
    //
    // if (!folder) {
    //   this.log("create folder")
    //   await api.flow.createFlowFolder({ flowfolder: { id: 'test-folder' }})
    //   folder = await api.flow.getFlowFolder({ id: 'test-folder' })
    // }
    //
    // this.log(folder)


    // const apps = await api.apps.getApps()
    // this.log(apps)

    // const tradfri = await api.apps.getApp({ id: 'com.ikea.tradfri'})


    // btnTriggers.forEach(x => {
    //   x.
    // })
    // console.log(btnTriggers)
  }

}

module.exports = MyApp;
