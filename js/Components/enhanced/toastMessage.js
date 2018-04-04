/**
 * by Joe
 */

import React, {createElement, Component} from 'react'
import PropTypes from 'prop-types'
import {View} from 'react-native'
import Toast from './../Toast'
import WithConnection from './WithConnection'

/**
 * 安卓返回键
 * @param  oldComponent 需要包装的原始组件
 * @return {React.Component} 包装之后的组件
 */
export default function toastMessage (oldComponent, navigationOptions = {}) {
  return WithConnection(class ToastMessage extends Component {
    constructor () {
      super(...arguments)
      this.allowShow = true
    }
    static propTypes = {
      msg: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ])
    }
    static navigationOptions = navigationOptions
    componentWillReceiveProps (np) {
      if (np.msg && this.allowShow && np.msg !== this.props.msg) {
        this.allowShow = false
        this.refs.__toast__.show(
          np.msg,
          2000,
          () => {
            this.allowShow = true
          }
        )
      }
    }
    render () {
      return (
        <View style={{flex: 1}}>
          {createElement(oldComponent, {...this.props})}
          <Toast ref='__toast__' />
        </View>
      )
    }
  }, navigationOptions)
}
