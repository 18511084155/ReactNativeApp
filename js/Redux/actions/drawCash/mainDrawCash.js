import {types} from './../../../Constants/actionTypes'
import {get, post} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData (obj) {
  return {
    types: [ types.MAIN_DRAW_CASH_LOAD_DATA_LOADING, types.MAIN_DRAW_CASH_LOAD_DATA_LOADING_SUCCESS, types.MAIN_DRAW_CASH_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.loanInfo,
      obj,
      {Authorization: global._user_.Authorization}
    )
  }
}

export function loadPurposeList (callback) {
  return {
    types: [ types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING, types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING_SUCCESS, types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.loanPurpose,
      null,
      {Authorization: global._user_.Authorization}
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback()
      }
      return data
    })
  }
}

export function getPayRequestId (callback) {
  return {
    types: [ types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING, types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING_SUCCESS, types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.loanCreate,
      {},
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback(data.data)
      }
      return data
    })
  }
}
