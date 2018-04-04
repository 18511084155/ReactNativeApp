import { Touchable } from 'react-native'
import DeviceStorage from '../Services/storage.service'
import theme from '../Constants/theme'

(function () {
  /**
   * util function
   */
  global.currentScreen = global.currentScreen || 'Loan'
  function formatUri (uri) {
    if (typeof uri === 'string') {
      let reg = /^http(s)?:\/\/(.*?)\//
      let formatUri = reg.exec(uri)
      if (formatUri) return formatUri[2]
      else return ''
    } else {
      return ''
    }
  }

  function limitHost (url) {
    var re = new RegExp('gapi.xyqb.com', 'g')
    return re.test(url)
  }

  function limitPath (url) {
    var re = new RegExp('/log/up', 'g')
    return re.test(url)
  }

  /**
   * hook req && res
   */
  global.fetch = (fetch => (...args) => interceptor(fetch, ...args))(global.fetch)

  function interceptor (fetch, ...args) {
    let startTime = new Date().getTime()
    let createPromise = Promise.resolve(args)
    let recordReq = createPromise.then(args => register.request(...args))
    let toFetch = recordReq.then(args => fetch(...args))
    let promise = toFetch.then(register.response.bind(this, startTime), register.responseError)
    return promise
  }

  const register = {
    request: function (url, config) {
      if (limitHost(formatUri(url)) && !limitPath(url)) {
        console.log('%c 抓取url', 'background: #222; color: white', url)
        DeviceStorage.genItemBody({
          type: 'httpRequest',
          page: global.currentScreen,
          offsetTime: new Date().getTime(),
          extraInfo: {
            method: config.method,
            uri: url,
            startTime: new Date().getTime(),
            body: config.body || ''
          }
        })
      }
      // hook request config
      return [url, config]
    },

    response: function (startTime, response) {
      // hook reponse
      DeviceStorage.genItemBody({
        type: 'httpResponse',
        page: global.currentScreen,
        offsetTime: new Date().getTime(),
        extraInfo: {
          uri: response.url,
          success: response.ok,
          httpCode: response.status,
          executeTime: new Date().getTime() - startTime
        }
      })
      return response
    },

    responseError: function (error) {
      // hook fetch repsonse error
      return Promise.reject(error)
    }
  }
  /**
   * hook touch
  */
  let originTouchable = Touchable.Mixin.touchableHandleResponderRelease
  Touchable.Mixin.touchableHandleResponderRelease = function (e) {
    let identify = [];
    (function getFlag (currentElement) {
      if (currentElement && currentElement.props) {
        let currentProps = currentElement.props
        if (currentProps['qg-log']) {
          identify.push(currentProps['qg-log'])
        } else {
          let next = currentElement && currentElement.props && currentElement.props.children || null
          if (next) {
            if (Object.prototype.toString.call(next) === '[object Array]') {
              for (let i = 0; i < next.length; i++) {
                getFlag(next[i])
              }
            } else if (typeof next === 'string') {
              identify.push(next)
            } else {
              getFlag(next)
            }
          }
        }
      } else {
        console.log('获取失败')
      }
    })(this)
    DeviceStorage.genItemBody({
      type: 'click',
      page: global.currentScreen, // url
      offsetTime: new Date().getTime(), // 当前操作相对于上次操作的偏移时间,后端收到消息后解析时间
      extraInfo: {
        x: (e.nativeEvent.pageX * (375 / theme.screenWidth)).toFixed(1) * 1, // x坐标
        y: ((e.nativeEvent.pageY) * (375 / theme.screenWidth)).toFixed(1) * 1, // y坐标
        identify: identify.join('|')
      }
    })
    originTouchable.call(this, e)
  }

  /**
   * error capture
   */
  require('ErrorUtils').setGlobalHandler((err) => {
    console.log('%c 出错：', 'background: red; color: white', err)
  })
})()
