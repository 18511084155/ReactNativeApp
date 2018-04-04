/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './Util/init.util'
import './Util/collection'
import { Provider } from 'react-redux'
import { main } from './Config/http'
import { NativeNavigation } from './Native/NativeRouter'
import Index from './Pages'
import createStore from './Redux/createStore'

const initInfo =
  `{
    "user":
      {
        "Authorization":"bearer be94274b-6e33-4fc0-9238-15ceb6d499c2",
        "phoneNo":"15800000009"
      },
    "params":
      {
        "isActive":true,
        "repayStatus":"2",
        "path":"${main}"
      }
  }`
  // `{
  //   "status":"INIT"
  // }`

export default (routeName) => class App extends Component {
  constructor (props) {
    super(...props)
    this._setGlobal = this._setGlobal.bind(this)
  }
  static propTypes = {
    routeParams: PropTypes.string
  }
  componentWillMount () {
    this._setGlobal()
    this.store = createStore()
    this.store.dispatch({type: 'Navigation/INIT', routeName})
  }
  componentDidMount () {
    global.store = this.store
  }
  _setGlobal () {
    let routeParams = JSON.parse(this.props.routeParams || initInfo)
    global._status_ = routeParams.status
    global._appChannel_ = NativeNavigation.getAppChannel
    global._user_ = routeParams.user
    if (routeParams.params) {
      global._params_ = routeParams.params
    } else {
      global._params_ = { path: main }
    }
    global._isLogin_ = !global.util.isNull(routeParams.user) && !global.util.isNull(routeParams.user.Authorization)
  }
  render () {
    return (
      <Provider store={this.store}>
        <Index />
      </Provider>
    )
  }
}
