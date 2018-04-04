import {
  apiPath,
  apiPayCenter,
  apiMall
} from './../Config/http'
export default {
  account: `${apiPath}/account`, // 获取账户信息
  exLkTab: `${apiMall}/ex/lk/tab`, // 获取首页列表信息
  accountNotifyRiskActive: `${apiPath}/account/notify_risk_active`, // 激活享花
  loanInfo: `${apiPath}/loan/info`, // 提现前获取信息接口
  loanPurpose: `${apiPath}/loan/purpose`, // 提现用途接口
  loanCreate: `${apiPath}/loan/create`, // 创建提现订单
  exCommonCardList: `${apiPayCenter}/ex/common/card/list`, // 获取银行卡列表
  exCommonCardToMerchant: `${apiPayCenter}/ex/common/card/to_merchant`, // 提现绑卡
  loanOrder: `${apiPath}/loan/order`, // 发起提现
  apiCaptcha: `${apiPath}/api/captcha`, // 获取图片验证码
  smsSendValidCodePic: `${apiPath}/sms/sendValidCodePic`, // 发送短验
  accountResetPwd: `${apiPath}/account/resetPwd`, // 修改密码
  exCommonCardMerchantAllowedCards: `${apiPayCenter}/ex/common/card/merchant_allowed_cards`, // 允许绑卡类型列表
  exCommonCardChooseRoute: `${apiPayCenter}/ex/common/card/choose_route`, // 获取绑卡支付渠道
  exCommonCardSms: `${apiPayCenter}/ex/common/card/sms`, // 获取绑卡验证码
  exCommonCardSmsConfirm: `${apiPayCenter}/ex/common/card/sms_confirm`, // 确认添加新卡
  repayGetPayments: `${apiPath}/repay/get_payments`, // 还款首页
  repayGetReward: `${apiPath}/repay/get_reward`, // 获取返现金额
  repay: `${apiPath}/repay`, // 发起还款
  exCommonRepayAmount: `${apiPayCenter}/ex/common/repay/amount`, // 还款确认绑卡
  exCommonCardMackeBindRelation: `${apiPayCenter}/ex/common/card/make_bind_relation`, // 还款确认绑卡
  exCommonRepayInit: `${apiPayCenter}/ex/common/repay/init`, // 还款初始化
  exCommonRepaySms: `${apiPayCenter}/ex/common/repay/sms`, // 还款发送验证码
  exCommonRepaySmsValidate: `${apiPayCenter}/ex/common/repay/sms_validate`, // 确认还款
  bill: `${apiPath}/bill`, // 账单首页概览
  billGetBillDetail: `${apiPath}/bill/get_bill_detail`, // 账单明细
  billGetFutureBill: `${apiPath}/bill/get_future_bill`, // 未出明细
  billGetBillHistory: `${apiPath}/bill/get_bill_history`, // 历史明细
  logUp: `https://collect.quantgroup.cn/log/up` // 上传日志
}
