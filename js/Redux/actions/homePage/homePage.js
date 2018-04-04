import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'
import {options} from './../../../Constants/static'

export function loadData (obj) {
  return {
    types: [ types.HOME_PAGE_LOAD_DATA_LOADING, types.HOME_PAGE_LOAD_DATA_LOADING_SUCCESS, types.HOME_PAGE_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.account,
      obj,
      {Authorization: global._user_.Authorization}
    )
  }
}

export function loadList () {
  return {
    types: [ types.HOME_PAGE_LOAD_LIST_LOADING, types.HOME_PAGE_LOAD_LIST_LOADING_SUCCESS, types.HOME_PAGE_LOAD_LIST_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.exLkTab,
      null,
      {
        source: options.mall
      }
    )
  }
}

export function active (obj, callback) {
  return {
    types: [ types.HOME_PAGE_ACTIVE_LOADING, types.HOME_PAGE_ACTIVE_LOADING_SUCCESS, types.HOME_PAGE_ACTIVE_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.accountNotifyRiskActive,
      obj,
      {
        Authorization: global._user_.Authorization
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

export function initStatus (obj) {
  return {
    type: types.HOME_PAGE_INIT_STATUS,
    obj
  }
}
