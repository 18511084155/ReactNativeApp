/**
 * Created by Joe on 2017/9/26.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, WebView, ViewPropTypes } from 'react-native'

const initJS = ``
/**
 * WebView组件
 * props: url:打开路径
 *        style:WebView样式
 */
export default class WebViewUtil extends React.Component {
  constructor () {
    super(...arguments)
    this._renderError = this._renderError.bind(this)
    this._reviewJS = this._reviewJS.bind(this)
    this._onNavigationStateChange = this._onNavigationStateChange.bind(this)
    this._onMessage = this._onMessage.bind(this)
    this.state = {
      init: true // 是否为首次加载标识
    }
  }
  static propTypes = {
    style: ViewPropTypes.style,
    url: PropTypes.string
  }
  _renderError (e) {
    console.log('异常信息===>', e)
  }
  // 判断url，注入js，返回值类型为function
  _reviewJS () {
    return alert('注入js')
  }
  // 监听地址栏变化
  _onNavigationStateChange (navState) {
    // 判断加载完成状态
    if (!navState.loading) {
      // 判断url
      if (navState.url.indexOf('1') > -1) {
        // 注入js
        this.refs.webView.injectJavaScript(this._reviewJS())
      }
    }
  }
  // H5调用window.postMessage方法会调用此方法
  _onMessage (e) {
    this.setState({init: false})
  }
  render () {
    let {url, style} = this.props
    return (
      <WebView
        ref='webView'
        style={[styles.round, style]}
        source={{uri: url, method: 'get'}}
        injectedJavaScript={this.state.init ? initJS : ''}
        renderError={this._renderError}
        onNavigationStateChange={this._onNavigationStateChange}
        automaticallyAdjustContentInsets={false}
        javaScriptEnabled
        domStorageEnabled
        startInLoadingState
        scalesPageToFit
      />
    )
  }
}

const styles = StyleSheet.create({
  round: {
    flex: 1,
    backgroundColor: '#fff'
  }
})

