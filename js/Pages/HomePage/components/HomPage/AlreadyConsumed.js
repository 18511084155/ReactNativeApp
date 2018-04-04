/**
 * Created by Joe on 2018/1/8.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableHighlight} from 'react-native'
import px2dp from '../../../../Util/px2dp'
import Card from './Card'
import theme from '../../../../Constants/theme'
import { Paragraph, Heading, HeadingBig } from '../../../../Components/Text'
import { alreadyConsumed } from './../../static'

export default class AlreadyConsumed extends React.Component {
  constructor () {
    super(...arguments)
    this._renderTouch = this._renderTouch.bind(this)
  }
  static propTypes = {
    data: PropTypes.object,
    goRepayment: PropTypes.func
  }
  _renderTouch () {
    switch (this.props.data.repayStatus) {
      case alreadyConsumed.unConsumed : {
        return <TouchableHighlight
          underlayColor={'rgba(225, 225, 225, 0.75)'}
          onPress={this.props.goRepayment}
        >
          <View style={styles.statusTouch1}>
            <Heading style={styles.statusTouchWord1}>
              立即还款
            </Heading>
          </View>
        </TouchableHighlight>
      }
      case alreadyConsumed.alreadyConsumed : {
        return <TouchableHighlight
          underlayColor={'rgba(225, 225, 225, 0.75)'}
          onPress={this.props.goRepayment}
        >
          <View style={styles.statusTouch1}>
            <Heading style={styles.statusTouchWord1}>
              立即还款
            </Heading>
          </View>
        </TouchableHighlight>
      }
      case alreadyConsumed.lowRepayment : {
        return <TouchableHighlight
          onPress={this.props.goRepayment}
          underlayColor={'rgba(225, 225, 225, 0.75)'}
        >
          <View style={styles.statusTouch2}>
            <View style={styles.hintView}>
              <Paragraph style={styles.hint}>已最</Paragraph>
              <Paragraph style={styles.hint}>还低</Paragraph>
            </View>
            <View style={styles.textView}>
              <Heading style={styles.statusTouchWord2}>
                立即还款
              </Heading>
            </View>
          </View>
        </TouchableHighlight>
      }
      case alreadyConsumed.repayment : {
        return <View />
      }
      case alreadyConsumed.overdue : {
        return <TouchableHighlight
          underlayColor={'rgba(225, 225, 225, 0.75)'}
          onPress={this.props.goRepayment}
        >
          <View style={styles.statusTouch2}>
            <View style={styles.hint1View}>
              <Paragraph style={styles.hint1}>已</Paragraph>
              <Paragraph style={styles.hint1}>逾</Paragraph>
              <Paragraph style={styles.hint1}>期</Paragraph>
            </View>
            <View style={styles.textView}>
              <Heading style={styles.statusTouchWord2}>
                立即还款
              </Heading>
            </View>
          </View>
        </TouchableHighlight>
      }
      default : { return <View /> }
    }
  }
  render () {
    let { data } = this.props
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Card>
          <View style={styles.cardInfoView}>
            <View style={styles.countFeeAllView}>
              <View style={styles.countFeeView}>
                <HeadingBig style={styles.countFee}>{String(data.availableAmount).split('.')[0]}</HeadingBig>
                <HeadingBig style={styles.countFeePoint}>
                  {String(data.availableAmount).split('.')[1] && '.' + String(data.availableAmount).split('.')[1]}
                </HeadingBig>
              </View>
              <Paragraph style={styles.countFeeName}>可用额度</Paragraph>
            </View>
            <View style={styles.consumedView}>
              <View style={styles.usedView}>
                <View style={styles.feeView}>
                  <HeadingBig style={styles.fee}>{String(data.usedAmount).split('.')[0]}</HeadingBig>
                  <HeadingBig style={styles.feePoint}>
                    {String(data.usedAmount).split('.')[1] && '.' + String(data.usedAmount).split('.')[1]}
                  </HeadingBig>
                </View>
                <Paragraph style={styles.name}>已用额度</Paragraph>
              </View>
              <View style={styles.backFeeView} />
            </View>
          </View>
        </Card>
        <View style={styles.statusBar}>
          {
            this.props.data.repayStatus === alreadyConsumed.unConsumed
              ? <View style={styles.statusWordView} />
              : this.props.data.repayStatus === alreadyConsumed.repayment
                ? <View style={styles.statusWordView}>
                  <Paragraph style={styles.statusWord}>
                    本月账单已还清
                  </Paragraph>
                </View>
                : <View style={styles.statusWordView}>
                  <Paragraph style={styles.statusWord}>
                    本月剩余应还：
                  </Paragraph>
                  <Paragraph style={styles.statusWord}>
                    {data.shouldRepay}
                  </Paragraph>
                </View>
          }
          {this._renderTouch()}
        </View>
      </View>
    )
  }
}

// <View style={styles.feeView}>
//   <HeadingBig style={styles.fee}>{String(data.rewardAmount).split('.')[0]}</HeadingBig>
//   <HeadingBig style={styles.feePoint}>
//     {String(data.rewardAmount).split('.')[1] && '.' + String(data.rewardAmount).split('.')[1]}
//   </HeadingBig>
// </View>
// <Paragraph style={styles.name}>返现余额</Paragraph>

const styles = StyleSheet.create({
  cardInfoView: {
    marginLeft: px2dp(68),
    marginTop: px2dp(18),
    width: px2dp(275),
    height: px2dp(200),
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  countFeeAllView: {
    marginTop: px2dp(18),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  countFeeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  countFee: {
    fontSize: px2dp(35),
    color: theme.cardColor
  },
  countFeePoint: {
    fontSize: px2dp(22),
    color: theme.cardColor,
    marginBottom: px2dp(4)
  },
  countFeeName: {
    fontSize: px2dp(11),
    fontWeight: theme.mediumFont,
    color: theme.cardColor
  },
  consumedView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginTop: px2dp(20)
  },
  usedView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  backFeeView: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  feeView: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end'
  },
  feePoint: {
    fontSize: px2dp(14),
    color: theme.cardColor,
    marginBottom: px2dp(3)
  },
  fee: {
    fontSize: px2dp(24),
    color: theme.cardColor
  },
  name: {
    fontSize: px2dp(11),
    fontWeight: theme.mediumFont,
    color: theme.cardColor
  },
  statusBar: {
    height: px2dp(43),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingRight: px2dp(25)
  },
  statusWordView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: px2dp(27)
  },
  statusTouch: {
    width: px2dp(146),
    height: px2dp(43),
    borderRadius: 5,
    backgroundColor: '#101113',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px2dp(25)
  },
  statusTouchWord: {
    fontSize: px2dp(17),
    color: theme.cardColor
  },
  statusTouch1: {
    width: px2dp(146),
    height: px2dp(43),
    borderRadius: 5,
    backgroundColor: '#101113',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusTouchWord1: {
    fontSize: px2dp(17),
    color: theme.cardColor
  },
  statusTouch2: {
    width: px2dp(146),
    height: px2dp(43),
    borderRadius: 5,
    backgroundColor: '#101113',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusTouchWord2: {
    fontSize: px2dp(17),
    color: theme.cardColor
  },
  hintView: {
    width: px2dp(28),
    height: px2dp(43),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.green,
    flexDirection: 'column',
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  hint1View: {
    width: px2dp(28),
    height: px2dp(43),
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.redColor,
    borderTopLeftRadius: 5,
    borderBottomLeftRadius: 5
  },
  hint: {
    fontSize: px2dp(10),
    lineHeight: px2dp(11),
    fontWeight: theme.mediumFont,
    color: '#fff'
  },
  hint1: {
    fontSize: px2dp(10),
    lineHeight: px2dp(13),
    color: '#fff',
    fontWeight: theme.mediumFont
  },
  textView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  statusTouch3: {
    width: px2dp(146),
    height: px2dp(43),
    borderRadius: 5,
    backgroundColor: theme.green,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: px2dp(25)
  },
  statusTouchWord3: {
    fontSize: px2dp(17),
    color: '#fff'
  },
  statusWord: {
    fontSize: px2dp(15),
    fontWeight: theme.mediumFont,
    color: theme.textColor
  }
})
