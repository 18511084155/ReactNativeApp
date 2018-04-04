/**
 * Created by Joe on 2017/9/28.
 */

import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native'
import {Paragraph} from './Text'
import px2dp from './../Util/px2dp'
import theme from './../Constants/theme'

const LoadingPage = props => {
  return (
    <TouchableOpacity onPress={props.onPress} style={styles.around}>
      <View style={styles.touchView}>
        <Paragraph style={styles.text}>{props.title || '点击刷新'}</Paragraph>
      </View>
      <ActivityIndicator size='large' />
    </TouchableOpacity>
  )
}

LoadingPage.propTypes = {
  onPress: PropTypes.func,
  title: PropTypes.string
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  touchView: {
    position: 'absolute',
    top: (theme.screenHeight / 3)
  },
  text: {
    fontSize: px2dp(14),
    color: theme.displayColor
  }
})

export default LoadingPage
