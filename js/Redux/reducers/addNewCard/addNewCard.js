import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  bankList: [],
  data: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.ADD_NEW_CARD_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.ADD_NEW_CARD_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('bankList', fromJS(action.data || []))
        .set('msg', '')
    case types.ADD_NEW_CARD_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.ADD_NEW_CARD_CHOOSE_ROUTE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.ADD_NEW_CARD_SEND_CODE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.ADD_NEW_CARD_SEND_CODE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.ADD_NEW_CARD_SEND_CODE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.ADD_NEW_CARD_SUBMIT_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.ADD_NEW_CARD_SUBMIT_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.ADD_NEW_CARD_SUBMIT_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}
