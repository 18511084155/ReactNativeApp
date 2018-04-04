import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData () {
  return {
    types: [ types.HISTORY_BILL_LOAD_DATA_LOADING, types.HISTORY_BILL_LOAD_DATA_LOADING_SUCCESS, types.HISTORY_BILL_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.billGetBillHistory,
      null,
      {Authorization: global._user_.Authorization}
    )
  }
}
