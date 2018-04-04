import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { addNavigationHelpers, NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { Main } from './../Navigation'
import {NativeNavigation} from './../Native/NativeRouter'
import { getBackStatus } from './../Util/util'
import { back } from './../Constants/static'
import { EnhancedBackHandler } from './../Components/enhanced'
import {types} from './../Constants/actionTypes'

const mapStateToProps = (state) => {
  return {
    navigation: state.navigation
  }
}
class Index extends Component {
  constructor () {
    super(...arguments)
    this.handleHardwareBackPress = this.handleHardwareBackPress.bind(this)
    this.timer = false
    this.exit = false
  }
  static propTypes = {
    dispatch: PropTypes.func.isRequired,
    navigation: PropTypes.object.isRequired
  }
  handleHardwareBackPress () {
    let routes = getBackStatus()
    if (routes === back.back) {
      this.props.dispatch(NavigationActions.back({
        key: null
      }))
    } else if (routes === back.exit) {
      if (this.exit) {
        return false
      } else {
        this.exit = true
        this.timer = setTimeout(() => {
          this.exit = false
        }, 2000)
        this.props.dispatch({
          type: types.INDEX_MSG,
          msg: '再点一次退出应用'
        })
        this.props.dispatch({
          type: types.INDEX_MSG,
          msg: ''
        })
      }
    } else if (routes === back.native) {
      NativeNavigation.back()
      return true
    } else if (routes === back.home) {
      NativeNavigation.goHome()
      return true
    }
    return true
  }
  render () {
    const { dispatch, navigation } = this.props
    return (
      <View style={{flex: 1}}>
        <Main navigation={addNavigationHelpers({dispatch: dispatch, state: navigation})} />
      </View>
    )
  }
}

export default connect(mapStateToProps, null)(EnhancedBackHandler()(Index))
