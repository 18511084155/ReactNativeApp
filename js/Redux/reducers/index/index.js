import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  msg: ''
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.INDEX_MSG:
      return state.set('msg', action.msg)
    default:
      return state
  }
}
