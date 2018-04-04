import { createStore as _createStore, applyMiddleware } from 'redux'
import {createLogger} from 'redux-logger'
import reducer from './reducers'

import navigationMiddleware from './middleware/navigationMiddleware'
import requestMiddleware from './middleware/requestMiddleware'

const isDebuggingInChrome = __DEV__ && !!window.navigator.userAgent

const logger = createLogger({
  predicate: (getState, action) => isDebuggingInChrome,
  collapsed: true,
  duration: true
})

let middlewares = [requestMiddleware, navigationMiddleware]

if (isDebuggingInChrome) {
  middlewares.push(logger)
}

export default function createStore () {
  let finalCreateStore = applyMiddleware(...middlewares)(_createStore)
  const store = finalCreateStore(reducer)
  return store
}
