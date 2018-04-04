/**
 * Created by Joe on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import px2dp from '../../../../Util/px2dp'
import Card from './Card'
import theme from '../../../../Constants/theme'
import { Paragraph, Heading } from '../../../../Components/Text'

export default class NotActive extends React.Component {
  static propTypes = {
    active: PropTypes.func
  }
  render () {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Card />
        <View style={styles.statusBar}>
          <View style={styles.statusWordView}>
            <Paragraph style={styles.statusWord}>
              尚未获得额度
            </Paragraph>
          </View>
          <TouchableHighlight
            onPress={this.props.active}
            underlayColor={'rgba(225, 225, 225, 0.75)'}
          >
            <View style={styles.statusTouch}>
              <Heading style={styles.statusTouchWord}>
                获取享花额度
              </Heading>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px2dp(55),
    paddingRight: px2dp(25)
  },
  statusWordView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusWord: {
    fontSize: px2dp(15),
    fontWeight: theme.mediumFont,
    color: theme.textColor
  },
  statusTouch: {
    width: px2dp(146),
    height: px2dp(43),
    borderRadius: 5,
    backgroundColor: '#101113',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusTouchWord: {
    fontSize: px2dp(17),
    color: theme.cardColor
  }
})
