import { AsyncStorage, Platform } from 'react-native'
import theme from '../Constants/theme'
import {post} from '../Services/request.service'
import api from '../Constants/api'
import { getDeviceId, getVersion, getUniqueID } from 'react-native-device-info'

class DeviceStorage {
  static lock = false
  static get (key) {
    return AsyncStorage.getItem(key).then((value) => {
      const jsonValue = JSON.parse(value)
      return jsonValue
    })
  }

  static save (key, value) {
    return AsyncStorage.setItem(key, JSON.stringify(value))
  }

  static update (key, value) {
    return DeviceStorage.get(key).then((item) => {
      value = typeof value === 'string' ? value : Object.assign({}, item, value)
      return AsyncStorage.setItem(key, JSON.stringify(value))
    })
  }

  static delete (key) {
    return AsyncStorage.removeItem(key)
  }

  static async genItemBody (body) {
    if (DeviceStorage.lock) {
      setTimeout(() => DeviceStorage.genItemBody(body), 0)
    } else {
      DeviceStorage.lock = true
      let last = await DeviceStorage.get('collection') || []
      if (Object.prototype.toString.call(last) !== '[object Array]') last = []
      last.push(body)
      if (last.length > 9) {
        await DeviceStorage.delete('collection')
        DeviceStorage.lock = false
        let info = {
          registerFrom: Platform.OS === 'ios' ? 214 : 217,
          appChannel: Platform.OS === 'ios' ? 'appstore' : '',
          phoneNo: global._status_ === 'INIT' ? '' : global._user_.phoneNo,
          sys: 'baitiaoliangka-' + (Platform.OS === 'ios' ? 'IOS' : 'Android'),
          width: theme.screenWidth,
          height: theme.screenHeight,
          appVersion: getVersion(),
          deviceId: getDeviceId(),
          uuid: getUniqueID()
        }
        last.forEach(z => {
          z.offsetTime = new Date().getTime() - z.offsetTime
        })
        info.list = last
        console.log('发送日志：', info)
        // post(
        //   api.logUp,
        //   { collection: info },
        //   { 'Content-Type': 'application/json' }
        // )
      } else {
        console.log('记录日志：', last)
        await DeviceStorage.save('collection', last)
        DeviceStorage.lock = false
      }
    }
  }
}

export default DeviceStorage
