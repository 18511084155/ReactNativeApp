import {NativeModules, NativeEventEmitter, Platform} from 'react-native'

const { navigation = {} } = NativeModules

// 调用原生返回
const goBack = param => navigation.back()

// 调用原生跳转
const goNext = (param = '') => navigation.toNext(param)

// 调到原生首页
const goHome = (url = 'xyqb://loan') => navigation.runSchemaAction(url)

// 打开原生WebView
const openWeb = url => navigation.runSchemaAction(url)

// 首页调用原生去还款
const goRepayment = () => navigation.showPayDialog()

// 首页调用原生设置密码
const goPayPassWord = () => navigation.openPayPassWordAction()

// 首页调用原生去登录
const goLogin = () => navigation.openLoginAction()

// 首页调用原生去登录带回调
const goLoginBack = (callback) => navigation.loginNativeFromCallback(callback)

// 首页调用原生去登录带回调
const getChannel = (callback) => {
  if (Platform.OS === 'ios') {
    callback('appstore')
    return
  }
  navigation.getAppChannel(callback)
}

// 首页调用原生去购物
const goMall = (url = 'xyqb://blanknote') => navigation.runSchemaAction(url)

module.exports = {
  NativeNavigation: {
    back: goBack,
    toNext: goNext,
    goHome: goHome,
    openWeb: openWeb,
    showPayDialog: goRepayment,
    openPayPassWordAction: goPayPassWord,
    openLoginAction: goLogin,
    getAppChannel: getChannel,
    loginNativeFromCallback: goLoginBack,
    goMall: goMall,
    eventEmit: new NativeEventEmitter(navigation)

  }
}
