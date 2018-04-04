import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  data: {},
  title: '',
  list: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.MONTH_BILL_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MONTH_BILL_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('list', fromJS(getList(action.data)))
        .set('data', fromJS(getData(action.data)))
        .set('title', action.data.title)
        .set('msg', '')
    case types.MONTH_BILL_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}

function getList (data) {
  if ((!data.details || !data.overview) || (data.details.length === 0 && data.overview.length === 0)) {
    return {}
  }
  return {'账单概览': data.overview || [], '账单明细': data.details || []}
}

function getData (data) {
  if (data.current) {
    return {
      repayStatus: data.repayStatus,
      lowest: data.lowest,
      shouldRepay: data.shouldRepay
    }
  }
  return {}
}
