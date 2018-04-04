/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableWithoutFeedback, Text } from 'react-native'
import { Heading, Label, Paragraph } from './Text'
import px2dp from './../Util/px2dp'

import theme from './../Constants/theme'

const TouchLabel = (
  {
    title = '', hint = '', status = '',
    titleStyle = {}, hintStyle = {}, statusStyle = {},
    titleTag = null, hintTag = null, statusTag = null,
    editable = true, hasTopLine = true, hasBottomLine = true,
    onPress = e => null, height = px2dp(80)
  }
) => {
  return (
    <View style={styles.around}>
      {
        React.createElement(
          editable ? TouchableWithoutFeedback : View,
          {
            onPress: onPress
          },
          (
            <View
              style={[
                styles.touch,
                hasTopLine && styles.topBorder,
                hasBottomLine && styles.bottomBorder,
                {height: height}
              ]}
            >
              <View style={styles.leftView}>
                <View style={styles.titleView}>
                  {
                    titleTag && titleTag
                  }
                  {
                    !global.util.isNull(title) &&
                    <Heading numberOfLines={1} style={[styles.title, titleStyle]}>
                      {title}
                    </Heading>
                  }
                </View>
                <View style={styles.hintView}>
                  {
                    hintTag &&
                    <View>
                      {hintTag}
                    </View>
                  }
                  {
                    !global.util.isNull(hint) &&
                    <Label numberOfLines={1} style={[styles.hint, hintStyle]}>
                      {hint}
                    </Label>
                  }
                </View>
              </View>
              <View style={styles.rightView}>
                {
                  statusTag && statusTag
                }
                {
                  !global.util.isNull(status) &&
                  <Paragraph numberOfLines={1} style={[styles.status, editable ? null : { color: theme.displayColor }, statusStyle]}>
                    {status}
                  </Paragraph>
                }
                {
                  editable &&
                  <Image style={styles.logo} source={require('./../Assets/touchArrow.png')} />
                }
              </View>
            </View>
          )
        )
      }
    </View>
  )
}

TouchLabel.propTypes = {
  title: PropTypes.string,
  titleTag: PropTypes.object,
  hint: PropTypes.string,
  hintTag: PropTypes.object,
  status: PropTypes.string,
  statusTag: PropTypes.object,
  editable: PropTypes.bool,
  hasTopLine: PropTypes.bool,
  hasBottomLine: PropTypes.bool,
  onPress: PropTypes.func,
  titleStyle: Text.propTypes.style,
  hintStyle: Text.propTypes.style,
  statusStyle: Text.propTypes.style,
  height: PropTypes.number
}

const styles = StyleSheet.create({
  around: {
    backgroundColor: '#fff'
  },
  topBorder: {
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  bottomBorder: {
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  touch: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  leftView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: 80,
    alignItems: 'flex-start'
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  hintView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    flex: 1,
    fontSize: px2dp(20),
    color: theme.textColor
  },
  hint: {
    flex: 1,
    color: theme.displayColor
  },
  rightView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  status: {
    fontSize: px2dp(15),
    marginRight: px2dp(13)
  },
  logo: {
    width: px2dp(10),
    height: px2dp(18)
  }
})

module.exports = TouchLabel
