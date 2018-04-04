export default store => next => action => {
  const {promise, types, ...rest} = action
  if (!promise) {
    return next(action)
  }

  const [REQUEST, SUCCESS, FAILED] = types
  next({...rest, type: REQUEST})

  return promise.then(response => {
    if (response && response.code === '0000' && response.businessCode === '0000') {
      next({
        ...rest,
        type: SUCCESS,
        data: response.data,
        msg: response.msg || ''
      })
    } else {
      next({
        ...rest,
        type: FAILED,
        data: {},
        msg: response.msg || ''
      })
    }
  }).catch(error => {
    console.warn('MIDDLEWARE ERROR:', error)
    next({
      ...rest,
      type: FAILED,
      data: {},
      msg: '服务器调用错误'
    })
  })
}
