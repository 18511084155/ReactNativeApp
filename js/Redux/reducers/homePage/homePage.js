import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  refreshing: false,
  loading: false,
  loadingSuccess: true,
  msg: '',
  data: {},
  list: []
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.HOME_PAGE_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.HOME_PAGE_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('data', fromJS(action.data))
        .set('msg', '')
    case types.HOME_PAGE_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.HOME_PAGE_LOAD_LIST_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.HOME_PAGE_LOAD_LIST_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('list', fromJS(action.data))
        .set('msg', '')
    case types.HOME_PAGE_LOAD_LIST_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.HOME_PAGE_ACTIVE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.HOME_PAGE_ACTIVE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.HOME_PAGE_ACTIVE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.HOME_PAGE_INIT_STATUS:
      return state
        .set('data', fromJS(action.obj))
        .set('msg', '')
    default:
      return state
  }
}
