(function (_G) {
  /**
   * 判断是否为空（null,undefined,''）
   * @param v 要判断的字符串
   * @returns {*} true or false
   */
  let isNull = function (v) {
    if (v === undefined || v === '' || v === null) { return true }
    return false
  }
  /**
   * 替换全部
   * @param v 原字符串
   * @param oldStr 要替换的字符
   * @param newStr 替换成的字符
   * @returns {*} 替换后的字符
   */
  let replaceAll = function (v, oldStr, newStr) {
    return v.replace(new RegExp(oldStr, 'gm'), newStr)
  }
  /**
   * 将空转换为空串
   * @param 要处理的内容
   * @returns 处理后的结果
   */
  var getNull2Str = text => {
    if (text === null || typeof text === 'undefined') { return '' }
    return text
  }
  /**
   * 将空转换为0
   * @param 要处理的内容
   * @returns 处理后的结果
   */
  var getNull2Zero = text => {
    if (text === null || typeof text === 'undefined' || isNaN(text) || text === '') { return 0 }
    return text
  }
  /**
   * 判断空object
   */
  var isEmptyObject = obj => {
    if (Object.getOwnPropertyNames(obj).length === 0) {
      return true// 返回true，不为空对象
    }
    return false// 返回false，为空对象
  }
  _G.util = {
    isNull: isNull,
    getNull2Str: getNull2Str,
    getNull2Zero: getNull2Zero,
    isEmptyObject: isEmptyObject,
    replaceAll: replaceAll
  }
})(global)

