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

export default class Unconsumed extends React.Component {
  static propTypes = {
    data: PropTypes.object,
    goMall: PropTypes.func
  }
  render () {
    let { data } = this.props
    return (
      <View style={{backgroundColor: '#fff'}}>
        <Card>
          <View style={styles.cardInfo}>
            <View style={styles.countFeeView}>
              <HeadingBig style={styles.countFee}>{String(data.creditAmount).split('.')[0]}</HeadingBig>
              <HeadingBig style={styles.countFeePoint}>
                {String(data.creditAmount).split('.')[1] && '.' + String(data.creditAmount).split('.')[1]}
              </HeadingBig>
            </View>
            <Paragraph style={styles.countFeeName}>总额度</Paragraph>
          </View>
        </Card>
        <View style={styles.statusBar}>
          <View style={styles.statusWordView}>
            <Paragraph style={styles.statusWord}>
              无购物记录
            </Paragraph>
          </View>
          <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} onPress={this.props.goMall}>
            <View style={styles.statusTouch}>
              <Heading style={styles.statusTouchWord}>
                前往购物
              </Heading>
            </View>
          </TouchableHighlight>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  cardInfo: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: px2dp(25),
    marginRight: px2dp(34)
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
