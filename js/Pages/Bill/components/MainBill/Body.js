/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet} from 'react-native'
import px2dp from '../../../../Util/px2dp'
import {TouchLabel} from '../../../../Components'
import {repayStatus} from './../../static'
import theme from '../../../../Constants/theme'
import { Paragraph } from '../../../../Components/Text'

export default class Body extends React.Component {
  constructor () {
    super(...arguments)
    this._getStatus = this._getStatus.bind(this)
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object
  }
  _getStatus () {
    let {data} = this.props
    switch (data.repayStatus) {
      case repayStatus.NonRepayment : {
        return String(data.shouldRepay)
      }
      case repayStatus.AlreadyRepaid : {
        return '已还清'
      }
      case repayStatus.MinimumRepayment : {
        return '已还最低'
      }
      case repayStatus.Overdue : {
        return '已逾期'
      }
      default : { return '' }
    }
  }
  render () {
    let {navigation: {navigate}, data} = this.props
    let billDay = data.billDay || ''
    return (
      <View>
        <View style={styles.title1View}>
          <Paragraph style={styles.title1}>账单还款</Paragraph>
        </View>
        {
          !data.hasOrder || data.repayStatus === repayStatus.unConsumed
          ? <TouchLabel
            title='未出账单'
            titleStyle={styles.titleStyle}
            hint={'出账日 ' + billDay}
            hintStyle={styles.hintStyle}
            height={px2dp(60)}
            onPress={e => navigate('NoAccountBill')}
          />
          : <View>
            <TouchLabel
              title='本月账单'
              titleStyle={styles.titleStyle}
              hint={'记账周期 ' + data.billCycle}
              hintStyle={styles.hintStyle1}
              status={this._getStatus()}
              statusStyle={[
                styles.statusStyle,
                {color: data.repayStatus === repayStatus.Overdue ? '#FF0000' : theme.textColor}
              ]}
              height={px2dp(60)}
              onPress={e => {
                navigate('MonthBill')
              }}
            />
            <TouchLabel
              title='未出账单'
              titleStyle={styles.titleStyle}
              hint={'出账日 ' + billDay}
              hintStyle={styles.hintStyle}
              height={px2dp(60)}
              hasTopLine={false}
              onPress={e => {
                navigate('NoAccountBill')
              }}
            />
            <View style={styles.title2View}>
              <Paragraph style={styles.title2}>历史查询</Paragraph>
            </View>
            <TouchLabel
              title='历史账单'
              titleStyle={styles.titleStyle}
              height={px2dp(60)}
              onPress={e => {
                navigate('HistoryBill')
              }}
            />
          </View>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  title1View: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingBottom: px2dp(5)
  },
  title1: {
    fontSize: px2dp(12),
    color: theme.themeColor
  },
  title2View: {
    alignItems: 'flex-start',
    marginTop: px2dp(50),
    paddingBottom: px2dp(5)
  },
  title2: {
    fontSize: px2dp(12),
    color: theme.themeColor
  },
  titleStyle: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.lightFont
  },
  hintStyle1: {
    fontSize: px2dp(11),
    color: theme.textLightColor,
    fontWeight: theme.lightFont,
    marginTop: px2dp(2)
  },
  hintStyle: {
    fontSize: px2dp(11),
    color: theme.textColor,
    fontWeight: theme.lightFont,
    marginTop: px2dp(2)
  },
  statusStyle: {
    fontWeight: theme.lightFont
  }
})
