import {types} from './../../../Constants/actionTypes'
import {get, post} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function getPicCaptcha () {
  return {
    types: [ types.PAY_PASSWORD_GETPICCAPTCHA_LOADING, types.PAY_PASSWORD_GETPICCAPTCHA_LOADING_SUCCESS, types.PAY_PASSWORD_GETPICCAPTCHA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.apiCaptcha,
      null,
      {Authorization: global._user_.Authorization}
    )
  }
}

export function sendValidCode (obj, callback) {
  return {
    types: [ types.PAY_PASSWORD_SENDVALIDCODE_LOADING, types.PAY_PASSWORD_SENDVALIDCODE_LOADING_SUCCESS, types.PAY_PASSWORD_SENDVALIDCODE_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.smsSendValidCodePic,
      obj,
      {Authorization: global._user_.Authorization}
    ).then(data => {
      if (data.businessCode === '0000' && data.code === '0000') {
        callback()
      }
      return data
    })
  }
}

export function subInfo (obj, callback) {
  return {
    types: [ types.PAY_PASSWORD_RESET_LOADING, types.PAY_PASSWORD_RESET_LOADING_SUCCESS, types.PAY_PASSWORD_RESET_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.accountResetPwd,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      if (data.businessCode === '0000' && data.code === '0000') {
        callback()
      }
      return data
    })
  }
}
