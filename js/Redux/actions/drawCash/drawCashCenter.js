import {types} from './../../../Constants/actionTypes'
import {post} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData (obj) {
  return {
    types: [ types.DRAW_CASH_CENTER_LOAD_DATA_LOADING, types.DRAW_CASH_CENTER_LOAD_DATA_LOADING_SUCCESS, types.DRAW_CASH_CENTER_LOAD_DATA_LOADING_FAILED ],
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

export function bindCard (obj, callback) {
  return {
    types: [ types.DRAW_CASH_CENTER_BIND_LOADING, types.DRAW_CASH_CENTER_BIND_LOADING_SUCCESS, types.DRAW_CASH_CENTER_BIND_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.exCommonCardToMerchant,
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
    types: [ types.DRAW_CASH_CENTER_SUBMIT_LOADING, types.DRAW_CASH_CENTER_SUBMIT_LOADING_SUCCESS, types.DRAW_CASH_CENTER_SUBMIT_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.loanOrder,
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
    type: types.DRAW_CASH_CENTER_SET_SELECTED_CARD,
    data
  }
}
