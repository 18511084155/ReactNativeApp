import qs from 'query-string'
import {NativeNavigation} from '../Native/NativeRouter'
import { DeviceEventEmitter } from 'react-native'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent
const timeout = 15000

export function get (url, params, headers = {}) {
  if (params) { url += `?${qs.stringify(params)}` }
  return request(url, {method: 'GET', headers: headers})
}
export function post (url, body, headers = {}) {
  if (!headers['Content-Type']) {
    headers['Content-Type'] = 'application/x-www-form-urlencoded'
  }
  if (headers && headers['Content-Type'] === 'application/x-www-form-urlencoded') {
    body = qs.stringify(body)
  } else if (headers && headers['Content-Type'] === 'application/json') {
    body = body ? JSON.stringify(body) : ''
  } else {
    body = body ? JSON.stringify(body) : ''
  }
  return request(url, {method: 'POST', headers: headers, body})
}
function request (url, option) {
  return timeoutFetch(timeout, fetch(url, option))
    .then(response => filter(response, url, option))
    .then(response => log(response, url, option))
    .catch(error => {
      throw error
    })
}
function timeoutFetch (ms, promise) {
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      reject(new Error('fetch time out'))
    }, ms)
    promise.then(
      (res) => {
        clearTimeout(timer)
        resolve(res)
      },
      (err) => {
        clearTimeout(timer)
        reject(err)
      }
    )
  })
}
function filter (response, url, option) {
  let result = response.json()
  if (response.status >= 200 && response.status < 300) {
    return result
  } else if (response.status === 401) {
    NativeNavigation.loginNativeFromCallback((Authorization, phoneNo) => {
      global._user_.Authorization = Authorization
      global._user_.phoneNo = phoneNo
      global._isLogin_ = !global.util.isNull(Authorization)
      DeviceEventEmitter.emit('__refresh__')
    })
    return {
      code: '0401',
      businessCode: '0401'
    }
  } else {
    throw new Error(response.error).res = response
  }
}
function log (response, url, option) {
  try {
    if (isDebuggingInChrome) {
      console.log('%c ' + url, 'background: #fff; color: green')
      console.log('%c 请求方式', 'background: #fff; color: orange', option)
      console.log('%c 返回结果', 'background: #fff; color: blue', response)
    }
    return response
  } catch (e) {
    console.log(e)
  }
}
