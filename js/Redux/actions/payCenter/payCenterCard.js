import {types} from './../../../Constants/actionTypes'
import {post} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadAmount (obj) {
  return {
    types: [ types.PAY_CENTER_AMOUNT_LOADING, types.PAY_CENTER_AMOUNT_LOADING_SUCCESS, types.PAY_CENTER_AMOUNT_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonRepayAmount,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    )
  }
}

export function loadData (obj) {
  return {
    types: [ types.PAY_CENTER_CARD_LOADING, types.PAY_CENTER_CARD_LOADING_SUCCESS, types.PAY_CENTER_CARD_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardList,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    )
  }
}

export function subInfo (obj, callback) {
  return {
    types: [ types.PAY_CENTER_CARD_SUBMIT_LOADING, types.PAY_CENTER_CARD_SUBMIT_LOADING_SUCCESS, types.PAY_CENTER_CARD_SUBMIT_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonRepaySmsValidate,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback(true)
      } else if (businessCode === '0002') {
      } else {
        callback(false, data.msg)
      }
      return data
    })
  }
}

export function bindCard (obj, callback) {
  return {
    types: [ types.PAY_CENTER_CARD_BIND_LOADING, types.PAY_CENTER_CARD_BIND_LOADING_SUCCESS, types.PAY_CENTER_CARD_BIND_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardMackeBindRelation,
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

export function repayInit (obj, callback) {
  return {
    types: [ types.PAY_CENTER_CARD_INIT_LOADING, types.PAY_CENTER_CARD_INIT_LOADING_SUCCESS, types.PAY_CENTER_CARD_INIT_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonRepayInit,
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

export function sendMsg (obj, callback) {
  return {
    types: [ types.PAY_CENTER_CARD_SEND_LOADING, types.PAY_CENTER_CARD_SEND_LOADING_SUCCESS, types.PAY_CENTER_CARD_SEND_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonRepaySms,
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

export function setSelectedCard (data) {
  return {
    type: types.SET_SELECTED_CARD,
    data
  }
}
