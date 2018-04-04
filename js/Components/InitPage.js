/**
 * by Joe
 */

import React from 'react'
import PropTypes from 'prop-types'
import { DeviceEventEmitter } from 'react-native'
// import { View, StyleSheet, ActivityIndicator, DeviceEventEmitter, TouchableHighlight } from 'react-native'
// import theme from './../Constants/theme'
// import { Paragraph } from './Text'
// import px2dp from '../Util/px2dp'

/**
 * loading
 */
export default class ToastMessage extends React.Component {
  static propTypes = {
    // loading: PropTypes.bool,
    // loadingSuccess: PropTypes.bool,
    children: PropTypes.object,
    refresh: PropTypes.func
  }
  componentWillMount () {
    this.__refresh__ && this.__refresh__.remove()
    this.__refresh__ = DeviceEventEmitter.addListener('__refresh__', this.props.refresh)
  }
  componentWillUnmount () {
    this.__refresh__ && this.__refresh__.remove()
  }
  render () {
    // let {loading, loadingSuccess} = this.props
    // if (!loading && !loadingSuccess) {
    //   return (
    //     <View style={styles.around}>
    //       <TouchableHighlight onPress={this.props.refresh} underlayColor={'rgba(225, 225, 225, 0.75)'}>
    //         <View style={styles.tip}>
    //           <Paragraph style={{fontSize: px2dp(14), color: theme.textColor}}>服务异常</Paragraph>
    //           <Paragraph style={{fontSize: px2dp(16), color: theme.textColor}}>点击刷新</Paragraph>
    //         </View>
    //       </TouchableHighlight>
    //       <ActivityIndicator size='large' />
    //     </View>
    //   )
    // } else {
    return this.props.children
    // }
  }
}

// const styles = StyleSheet.create({
//   around: {
//     position: 'absolute',
//     top: 0,
//     left: 0,
//     width: theme.screenWidth,
//     height: theme.screenHeight,
//     zIndex: 9999,
//     flexDirection: 'column',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingTop: theme.screenHeight / 3,
//     backgroundColor: '#fff'
//   },
//   tip: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     flexDirection: 'column',
//     paddingBottom: px2dp(20)
//   }
// })
