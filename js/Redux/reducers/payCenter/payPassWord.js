import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  loadingSuccess: true,
  msg: '',
  captcha: {}
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.PAY_PASSWORD_GETPICCAPTCHA_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_PASSWORD_GETPICCAPTCHA_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('captcha', fromJS(action.data))
        .set('msg', '')
    case types.PAY_PASSWORD_GETPICCAPTCHA_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_PASSWORD_SENDVALIDCODE_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_PASSWORD_SENDVALIDCODE_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_PASSWORD_SENDVALIDCODE_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    case types.PAY_PASSWORD_RESET_LOADING:
      return state
        .set('loading', true)
        .set('loadingSuccess', false)
        .set('msg', '')
    case types.PAY_PASSWORD_RESET_LOADING_SUCCESS:
      return state
        .set('loading', false)
        .set('loadingSuccess', true)
        .set('msg', '')
    case types.PAY_PASSWORD_RESET_LOADING_FAILED:
      return state
        .set('loading', false)
        .set('loadingSuccess', false)
        .set('msg', action.msg)
    default:
      return state
  }
}
