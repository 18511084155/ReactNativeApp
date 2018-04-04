import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  amount: '',
  list: [],
  selected: {},
  data: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.PAY_CENTER_AMOUNT_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_AMOUNT_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('amount', action.data)
        .set('msg', '')
    case types.PAY_CENTER_AMOUNT_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_CENTER_CARD_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_CARD_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('list', fromJS(action.data.cardList || []))
        .set('selected', fromJS(getSelected(action.data.cardList)))
        .set('msg', '')
    case types.PAY_CENTER_CARD_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_CENTER_CARD_BIND_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_CARD_BIND_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_CENTER_CARD_BIND_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_CENTER_CARD_INIT_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_CARD_INIT_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_CENTER_CARD_INIT_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_CENTER_CARD_SEND_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_CARD_SEND_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_CENTER_CARD_SEND_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_CENTER_CARD_SUBMIT_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_CENTER_CARD_SUBMIT_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_CENTER_CARD_SUBMIT_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.SET_SELECTED_CARD:
      return state.set('selected', fromJS(action.data))
    default:
      return state
  }
}

function getSelected (list) {
  if (list && list.length > 0) {
    for (let z of list) {
      if (z.selected) {
        return z
      }
    }
  }
  return {}
}
