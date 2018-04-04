module.exports = {
  repayStatus: {
    unConsumed: 'NOT_CHARGE_OFF', // 未出账
    NonRepayment: 'CHARGE_OFF', // 未还款
    AlreadyRepaid: 'PAY_OFF', // 已还清
    MinimumRepayment: 'COMPLETE_LOWEST', // 最低还款
    Overdue: 'OVERDUE' // 已逾期
  }
}
