import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableHighlight, ViewPropTypes } from 'react-native'
import { Paragraph } from './Text'
import px2dp from '../Util/px2dp'
import theme from './../Constants/theme'

/**
 * label按钮
 *
 * proprs：
 *  text:按钮文字
 *  editable:是否可编辑
 *  onPress:点击回调
 *  containerStyle:按钮外部容器样式
 *  touchSttyle:按钮样式
 *  textStyle:按钮中文字样式
 */

const LabelButton = props => {
  let {
    text = '', editable = true, onPress = p => null,
    containerStyle = {}, touchStyle = {}, textStyle = {}
  } = props
  return (
    <View style={[styles.around, containerStyle, !editable && {opacity: 0.5}]}>
      {
        React.createElement(
          editable ? TouchableHighlight : View,
          {
            underlayColor: 'rgba(225, 225, 225, 0.75)',
            onPress: e => onPress(e)
          },
          <View style={[styles.touch, touchStyle]}>
            <Paragraph style={[styles.text, textStyle]}>{text}</Paragraph>
          </View>
        )
      }
    </View>
  )
}

const styles = StyleSheet.create({
  around: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  touch: {//
    justifyContent: 'center',
    alignItems: 'center',
    width: px2dp(335),
    height: px2dp(40),
    borderRadius: 4,
    backgroundColor: theme.themeColor
  },
  text: {//
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
    fontSize: px2dp(17)
  }
})

LabelButton.propTypes = {
  text: PropTypes.string,
  editable: PropTypes.bool,
  onPress: PropTypes.func,
  containerStyle: ViewPropTypes.style,
  touchStyle: ViewPropTypes.style,
  textStyle: ViewPropTypes.style
}

export default LabelButton
