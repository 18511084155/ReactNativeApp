import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  paycenterNo: '',
  data: {},
  repayFee: '',
  deductibleFee: ''
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.MAIN_FEE_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_FEE_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('data', fromJS(action.data))
        .set('msg', '')
    case types.MAIN_FEE_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('deductibleFee', action.data)
        .set('msg', '')
    case types.MAIN_FEE_GET_DEDUCTIBLE_FEE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.MAIN_FEE_REPAY_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.MAIN_FEE_REPAY_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('paycenterNo', action.data)
        .set('msg', '')
    case types.MAIN_FEE_REPAY_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}
