import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  list: [],
  selected: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.DRAW_CASH_CENTER_LOAD_DATA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.DRAW_CASH_CENTER_LOAD_DATA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('list', fromJS(action.data.cardList || []))
        .set('selected', fromJS(getSelected(action.data.cardList || [])))
        .set('msg', '')
    case types.DRAW_CASH_CENTER_LOAD_DATA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.DRAW_CASH_CENTER_SUBMIT_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.DRAW_CASH_CENTER_SUBMIT_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.DRAW_CASH_CENTER_SUBMIT_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.DRAW_CASH_CENTER_BIND_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.DRAW_CASH_CENTER_BIND_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.DRAW_CASH_CENTER_BIND_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.DRAW_CASH_CENTER_SET_SELECTED_CARD:
      return state.set('selected', fromJS(action.data))
    default:
      return state
  }
}

function getSelected (list) {
  for (let z of list) {
    if (z.selected) {
      return z
    }
  }
  return {}
}
