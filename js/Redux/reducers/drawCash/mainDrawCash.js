import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  payRequestId: '',
  data: {},
  purposeList: []
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('purposeList', fromJS(getPurposeList(action.data)))
        .set('msg', '')
    case types.MAIN_DRAW_CASH_LOAD_PURPOSE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.MAIN_DRAW_CASH_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_DRAW_CASH_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('data', fromJS(action.data))
        .set('msg', '')
    case types.MAIN_DRAW_CASH_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('payRequestId', action.data.payRequestId)
        .set('msg', '')
    case types.MAIN_DRAW_CASH_PAY_REQUEST_ID_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}

function getPurposeList (data) {
  let list = []
  for (let v of data) {
    list.push({id: v.key, name: v.desc})
  }
  return list
}
