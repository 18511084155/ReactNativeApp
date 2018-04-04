/* 银行卡logo */
export const bankInfo = {
  ABC: {
    icon: require('./../Assets/bank-icon/ABC.png'),
    name: '农业银行'
  },
  BCCB: {
    icon: require('./../Assets/bank-icon/BCCB.png'),
    name: '交通银行'
  },
  BOC: {
    icon: require('./../Assets/bank-icon/BOC.png'),
    name: '中国银行'
  },
  BOCO: {
    icon: require('./../Assets/bank-icon/BOCO.png'),
    name: '北京银行'
  },
  CCB: {
    icon: require('./../Assets/bank-icon/CCB.png'),
    name: '建设银行'
  },
  CEB: {
    icon: require('./../Assets/bank-icon/CEB.png'),
    name: '光大银行'
  },
  CIB: {
    icon: require('./../Assets/bank-icon/CIB.png'),
    name: '兴业银行'
  },
  CMBC: {
    icon: require('./../Assets/bank-icon/CMBC.png'),
    name: '民生银行'
  },
  CMBCHINA: {
    icon: require('./../Assets/bank-icon/CMBCHINA.png'),
    name: '招商银行'
  },
  ECITIC: {
    icon: require('./../Assets/bank-icon/ECITIC.png'),
    name: '中信银行'
  },
  GDB: {
    icon: require('./../Assets/bank-icon/GDB.png'),
    name: '广发银行'
  },
  HXB: {
    icon: require('./../Assets/bank-icon/HXB.png'),
    name: '华夏银行'
  },
  ICBC: {
    icon: require('./../Assets/bank-icon/ICBC.png'),
    name: '工商银行'
  },
  PINGAN: {
    icon: require('./../Assets/bank-icon/PINGAN.png'),
    name: '平安银行'
  },
  POST: {
    icon: require('./../Assets/bank-icon/POST.png'),
    name: '邮政储蓄'
  },
  SPDB: {
    icon: require('./../Assets/bank-icon/SPDB.png'),
    name: '浦发银行'
  },
  WEIXIN: {
    icon: require('./../Assets/bank-icon/WEIXIN.png'),
    name: '微信支付'
  }
}
/* 直辖市code */
export const specialCity = ['110000', '120000', '310000', '500000']
/* 客服电话 */
export const customerServiceNumber = `4000020061`
/* app配置 */
export const options = {
  webViewTitle: '白条量卡',
  appName: 'baitiaoliangka',
  merchantCode: 'LIANG_KA', // 渠道码
  mall: 2, // 商城渠道
  h: 0, // headerTitle显示状态：隐藏
  appChannel: 'appstore',
  registerFrom: 214, // 渠道码
  channelID: 1 // channlID
}
/* 用户激活状态 */
export const userStatus = {
  fail: 'ACTIVATE_FAILED', // 激活失败
  disable: 'DISABLE', // 禁用
  default: 'INIT', // 默认（未激活）
  doing: 'ACTIVATING', // 激活中
  missPassword: 'ACTIVATE_SUCC_NO_PWD', // 激活成功未设置密码
  success: 'ACTIVATE_SUCC' // 激活成功
}
/* 路由返回status */
export const back = {
  back: 'back', // 返回rn路由
  exit: 'exit', // 退出app
  home: 'home', // 退回首页
  native: 'native' // 返回原生
}
/* 点击安卓返回键返回首页的路由 */
export const backHomeRoutes = [
  'PayFailed',
  'PaySuccess',
  'DrawCashSuccess'
]
/* 原生发送时间通知KEY */
export const nativeEmitKey = {
  refreshHOMEPAGE: 'refreshHOMEPAGE' // 刷新首页
}
/* 加载状态 */
export const native = {
  INIT: 'INIT' // 首次预加载，不调用接口
}
/* webView URL */
export const webUrl = {
  drawCashAgreement: 'https://ptlogin.4399.com/oauth2/authorize.do?client_id=a9a16636dbaeb917e2ffb16f0d52006e&redirect_uri=http%3A%2F%2Fsave.api.4399.com%2Fh5%2Fv3%2Fuser%2Flogin%3FgameId%3D100053259%26gameUrl%3Dhttp%253A%252F%252Fsave.api.4399.com%252Fh5%252Fv3%252Fh5-frame%252Findex.php%253FgameId%253D100053259%25264399id%253D194879%2526wap%253D1%2526ADTAG%253Dwap.100053259&response_type=token&show_ext_login=true&css=https%3A%2F%2Fcdn.h5wan.4399sj.com%2Fpublic%2Flogin%2Fe15711c0365d4f0dd503602ec2f2223e%2Flogin.css' // 提现协议
}
