/**
 * Created by Joe on 2017/10/12.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, TextInput, TouchableHighlight, Switch, StyleSheet, Platform} from 'react-native'
import {Paragraph} from './../../../../Components/Text'
import theme from './../../../../Constants/theme'
import px2dp from '../../../../Util/px2dp'
import { repayStatus } from './../../static'

class Title extends Component {
  render () {
    return (
      <Paragraph style={styles.titText}>本次还款</Paragraph>
    )
  }
}
class Fee extends Component {
  constructor () {
    super(...arguments)
    this._repaymentStatusBack = this._repaymentStatusBack.bind(this)
  }
  static propTypes = {
    value: PropTypes.string,
    allAmount: PropTypes.string,
    repaymentStatus: PropTypes.string,
    onChange: PropTypes.func,
    repaymentStatusBack: PropTypes.func
  }
  _repaymentStatusBack (status) {
    let {repaymentStatusBack} = this.props
    repaymentStatusBack(status)
  }
  render () {
    let {value, onChange, repaymentStatus, allAmount} = this.props
    return (
      <View>
        <View>
          <Paragraph style={styles.hintText}>本次还款{allAmount ? allAmount + '元' : ''}</Paragraph>
        </View>
        <View style={styles.feeItem}>
          <View style={styles.feeGroup}>
            <View>
              <Paragraph style={styles.logoFee}>￥</Paragraph>
            </View>
            <View style={styles.feeView}>
              <TextInput
                style={styles.fee}
                editable={repaymentStatus === repayStatus.input}
                keyboardType={'numeric'}
                placeholder='还款金额'
                placeholderTextColor={theme.placeholderColor}
                underlineColorAndroid='transparent'
                value={value}
                onChangeText={onChange}
              />
            </View>
          </View>
          {
            repaymentStatus === repayStatus.input ? (
              <View style={styles.btnGroup}>
                <TouchableHighlight
                  underlayColor={'rgba(225, 225, 225, 0.75)'}
                  onPress={e => this._repaymentStatusBack(repayStatus.low)}
                  style={styles.btnOne}
                >
                  <View>
                    <Paragraph style={styles.btnStyle}>最低还款</Paragraph>
                  </View>
                </TouchableHighlight>
                <TouchableHighlight
                  underlayColor={'rgba(225, 225, 225, 0.75)'}
                  onPress={e => this._repaymentStatusBack(repayStatus.top)}
                  style={styles.btnTwo}
                >
                  <View>
                    <Paragraph style={styles.btnStyle}>还清本月</Paragraph>
                  </View>
                </TouchableHighlight>
              </View>) : null
          }
        </View>
      </View>
    )
  }
}
class SwitchBtn extends Component {
  constructor () {
    super(...arguments)
    this.state = {
      isDeductible: true
    }
  }
  static propTypes = {
    value: PropTypes.bool,
    fee: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    onChange: PropTypes.func
  }
  render () {
    let {value, onChange, fee} = this.props
    let setting = {
      thumbTintColor: '#fff',
      onTintColor: theme.themeColor
    }
    if (Platform.OS === 'ios') {
      setting = {}
    }
    return (
      <View style={styles.switchView}>
        <View style={styles.switchInfo}>
          <Paragraph style={styles.switchText}>返现抵扣</Paragraph>
          <Paragraph style={styles.switchFee}>可用{fee}元</Paragraph>
        </View>
        <View style={styles.switchBtn}>
          <Switch
            value={value}
            {...setting}
            onValueChange={isDeductible => { onChange(isDeductible) }}
          />
        </View>
      </View>
    )
  }
}

module.exports = {
  Title,
  Fee,
  SwitchBtn
}

const styles = StyleSheet.create({
  titText: {
    fontSize: px2dp(14),
    color: theme.textLightColor
  },
  hintText: {
    fontSize: px2dp(12),
    color: theme.displayColor
  },
  feeItem: {
    flex: 1,
    flexDirection: 'row',
    height: px2dp(50),
    marginTop: px2dp(20),
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  btnStyle: {
    fontSize: px2dp(12),
    color: theme.themeColor
  },
  feeGroup: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: px2dp(10)
  },
  logoFee: {
    flex: 1,
    fontSize: px2dp(30),
    color: theme.textColor,
    marginRight: px2dp(10),
    fontWeight: theme.regularFont,
    textAlign: 'center'
  },
  feeView: {
    flex: 1
  },
  fee: {
    flex: 1,
    fontSize: px2dp(30),
    color: theme.textColor,
    padding: 0,
    fontWeight: theme.regularFont
  },
  btnGroup: {
    flexDirection: 'row',
    justifyContent: 'flex-end'
  },
  btnOne: {
    height: px2dp(50),
    justifyContent: 'center'
  },
  btnTwo: {
    height: px2dp(50),
    justifyContent: 'center',
    marginLeft: px2dp(20)
  },
  switchView: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  switchInfo: {
    flex: 1,
    flexDirection: 'row'
  },
  switchText: {
    fontSize: px2dp(15),
    color: theme.textColor,
    marginRight: px2dp(6)
  },
  switchFee: {
    fontSize: px2dp(15),
    color: theme.textColor
  },
  switchBtn: {
    flex: 1,
    alignItems: 'flex-end'
  }
})
