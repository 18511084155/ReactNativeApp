import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  list: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('list', fromJS(getData(action.data)))
        .set('msg', '')
    case types.NO_ACCOUNT_BILL_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}

function getData (data) {
  if (!data.details || data.details === 0) {
    return {}
  }
  return {[data.title || '未知日期']: data.details || []}
}
