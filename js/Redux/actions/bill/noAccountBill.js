import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData () {
  return {
    types: [ types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING, types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING_SUCCESS, types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.billGetFutureBill,
      null,
      {Authorization: global._user_.Authorization}
    )
  }
}
