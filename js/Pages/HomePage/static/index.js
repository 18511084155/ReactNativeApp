module.exports = {
  audit: {
    auditing: 'ACTIVATING', // 审核中
    throughAudit: 'ACTIVATE_SUCC_NO_PWD', // 审核通过未设置密码
    auditFailure: 'ACTIVATE_FAILED' // 审核失败
  },
  alreadyConsumed: {
    unConsumed: 'NOT_CHARGE_OFF', // 未出账(无购物记录)
    alreadyConsumed: 'CHARGE_OFF', // 已出账(未还款)
    lowRepayment: 'COMPLETE_LOWEST', // 已经最低还款
    repayment: 'PAY_OFF', // 已还清
    overdue: 'OVERDUE' // 已逾期
  }
}
