/**
 * Created by Joe on 2017/3/23.
 */
'use strict'

// 校验验手机号
export function phoneValid (phone) {
  if (global.util.isNull(phone)) {
    return false
  }
  // 13, 14, 15, 17, 18开头
  if (!(/^1(3|4|5|7|8)\d{9}$/.test(phone))) {
    return false
  }
  if (!/^1[0-9]{10}$/.test(phone)) {
    return false
  }
  return true
}

// 判断固定电话， 首位必须为0
export function telValid (tel) {
  let result = {
    pass: true,
    tip: ''
  }
  if (!(/^0\d{2,3}(-?)\d{7,9}$/.test(tel))) {
    result.tip = '固定电话有误'
    result.pass = false
  }
  return result
}

// 检验身份证
export function idCardValid (code) {
  if (code.length === 15 || code.length === 18) {
    return true
  } else {
    return false
  }
}

// 校验姓名
export function ChineseValid (str) {
  if (!(/^[\u4e00-\u9fa5\uF900-\uFA2D]{2,15}$/.test(str))) { return false }
  return true
}

// 校验验数字格式（整数，小数）
export function strValid (type, data) {
  let reg = ''
  // 整数
  if (type === 'Integer') {
    reg = /^-?\d+$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }
  // 正整数
  if (type === 'positiveInteger') {
    reg = /^[0-9]*[1-9][0-9]*$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }
  // 最多只能保留两位小数
  if (type === 'float2') {
    reg = /^[0-9]+([.]{1}[0-9]{1,2})?$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }
  // 只允许输入数字和小数点
  if (type === 'integerAndFloat') {
    reg = /^\d+(\.\d+)?$/
    if (!reg.test(data)) {
      return false
    }
    return true
  }
  return true
}

export function domainURI (str) {
  let durl = /(http|https):\/\/(.*?)\//i
  let domain = str.match(durl)
  return domain && domain[2] || ''
}
