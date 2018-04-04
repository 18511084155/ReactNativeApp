import {types} from './../../../Constants/actionTypes'
import {get} from './../../../Services/request.service'
import api from './../../../Constants/api'

export function loadData (token, callback) {
  return {
    types: [ types.MINE_LOAD_DATA_LOADING, types.MINE_LOAD_DATA_LOADING_SUCCESS, types.MINE_LOAD_DATA_LOADING_FAILED ],
    promise: get(api.test, {loanState: 0}).then(data => {
      callback(data)
      return data
    })
  }
}
