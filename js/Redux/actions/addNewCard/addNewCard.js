import {types} from './../../../Constants/actionTypes'
import { post } from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadAllowedCards (
  obj) {
  return {
    types: [ types.ADD_NEW_CARD_LOAD_DATA_LOADING, types.ADD_NEW_CARD_LOAD_DATA_LOADING_SUCCESS, types.ADD_NEW_CARD_LOAD_DATA_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardMerchantAllowedCards,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    )
  }
}

export function chooseRoute (obj, callback) {
  return {
    types: [ types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING, types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING_SUCCESS, types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardChooseRoute,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback()
      }
      return data
    })
  }
}

export function sendCode (obj, callback) {
  return {
    types: [ types.ADD_NEW_CARD_SEND_CODE_LOADING, types.ADD_NEW_CARD_SEND_CODE_LOADING_SUCCESS, types.ADD_NEW_CARD_SEND_CODE_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardSms,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback()
      }
      return data
    })
  }
}

export function subInfo (obj, callback) {
  return {
    types: [ types.ADD_NEW_CARD_SUBMIT_LOADING, types.ADD_NEW_CARD_SUBMIT_LOADING_SUCCESS, types.ADD_NEW_CARD_SUBMIT_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardSmsConfirm,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback()
      }
      return data
    })
  }
}
