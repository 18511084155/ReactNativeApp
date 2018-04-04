import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData (obj) {
  return {
    types: [ types.MONTH_BILL_LOAD_DATA_LOADING, types.MONTH_BILL_LOAD_DATA_LOADING_SUCCESS, types.MONTH_BILL_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.billGetBillDetail,
      obj,
      {Authorization: global._user_.Authorization}
    )
  }
}
