import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData () {
  return {
    types: [ types.MAIN_BILL_LOAD_DATA_LOADING, types.MAIN_BILL_LOAD_DATA_LOADING_SUCCESS, types.MAIN_BILL_LOAD_DATA_LOADING_FAILED ],
    promise: get(
      global._params_.path + api.bill,
      null,
      {Authorization: global._user_.Authorization}
    )
  }
}
