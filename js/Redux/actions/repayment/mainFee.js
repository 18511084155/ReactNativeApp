import {types} from './../../../Constants/actionTypes'
import {get, post} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData (callback) {
  return {
    types: [ types.MAIN_FEE_LOAD_DATA_LOADING, types.MAIN_FEE_LOAD_DATA_LOADING_SUCCESS, types.MAIN_FEE_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.repayGetPayments,
      null,
      {Authorization: global._user_.Authorization}
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback(data.data)
      }
      return data
    })
  }
}

export function getDeductibleFee (obj, callback) {
  return {
    types: [ types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING, types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING_SUCCESS, types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.repayGetReward,
      obj,
      {Authorization: global._user_.Authorization}
    ).then(data => {
      callback(data.data.availableReward)
      return data
    })
  }
}

export function goPayCenter (obj, callback) {
  return {
    types: [ types.MAIN_FEE_REPAY_LOADING, types.MAIN_FEE_REPAY_LOADING_SUCCESS, types.MAIN_FEE_REPAY_LOADING_FAILED ],
    promise: post(
      global._params_.path + api.repay,
      obj,
      {
        Authorization: global._user_.Authorization,
        'Content-Type': 'application/json'
      }
    ).then(data => {
      let { businessCode, code } = data
      if (businessCode === '0000' && code === '0000') {
        callback(data.data.paycenterNo)
      }
      return data
    })
  }
}
