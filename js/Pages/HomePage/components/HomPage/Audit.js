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
import { audit } from './../../static'

export default class Audit extends React.Component {
  constructor () {
    super(...arguments)
    this._getStatusWord = this._getStatusWord.bind(this)
    this._renderTouch = this._renderTouch.bind(this)
  }
  static propTypes = {
    data: PropTypes.object,
    setPassWord: PropTypes.func
  }
  _getStatusWord () {
    switch (this.props.data.status) {
      case audit.auditing : {
        return <View style={styles.statusWordView1}>
          <Paragraph style={styles.statusWord}>
            极速审核中...
          </Paragraph>
        </View>
      }
      case audit.throughAudit : {
        return <View style={styles.statusWordView2}>
          <Paragraph style={styles.statusWord}>
            审核通过！
          </Paragraph>
        </View>
      }
      case audit.auditFailure : {
        return <View style={styles.statusWordView3}>
          <Paragraph style={styles.statusWord}>
            审核失败！
          </Paragraph>
        </View>
      }
      default : { return <View /> }
    }
  }
  _renderTouch () {
    switch (this.props.data.status) {
      case audit.auditing : {
        return <View />
      }
      case audit.throughAudit : {
        return <TouchableHighlight
          onPress={this.props.setPassWord}
          underlayColor={'rgba(225, 225, 225, 0.75)'}
        >
          <View style={styles.statusTouch}>
            <Heading style={styles.statusTouchWord}>
              设置支付密码
            </Heading>
          </View>
        </TouchableHighlight>
      }
      case audit.auditFailure : {
        return <View />
      }
      default : { return <View /> }
    }
  }
  render () {
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Card />
        <View style={styles.statusBar}>
          {this._getStatusWord()}
          {this._renderTouch()}
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  statusBar: {
    height: px2dp(43),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: px2dp(25)
  },
  statusWordView1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: px2dp(27)
  },
  statusWordView2: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: px2dp(66)
  },
  statusWordView3: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: px2dp(27)
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
