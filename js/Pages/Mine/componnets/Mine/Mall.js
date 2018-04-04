import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { Paragraph } from './../../../../Components/Text'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

const Mall = props => {
  return (
    <View style={styles.round}>
      <TouchableOpacity style={styles.titleView}>
        <Paragraph style={styles.title}>商城订单</Paragraph>
        <View style={styles.touchArrow}>
          <Paragraph style={styles.date}>查看全部订单</Paragraph>
          <Image style={styles.arrow} source={require('./../../../../Assets/touchArrow.png')} />
        </View>
      </TouchableOpacity>
      <View style={styles.hintView}>
        <TouchableOpacity style={styles.hint1View}>
          <Image source={require('./../../../../Assets/pay.png')} />
          <Paragraph style={styles.name}>待付款</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hint1View}>
          <Image source={require('./../../../../Assets/car.png')} />
          <Paragraph style={styles.name}>待发货</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hint1View}>
          <Image source={require('./../../../../Assets/bill.png')} />
          <Paragraph style={styles.name}>待收货</Paragraph>
        </TouchableOpacity>
        <TouchableOpacity style={styles.hint1View}>
          <Image source={require('./../../../../Assets/fee.png')} />
          <Paragraph style={styles.name}>完成/取消</Paragraph>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  round: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    marginTop: px2dp(10)
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    height: px2dp(60)
  },
  title: {
    fontSize: px2dp(15),
    fontWeight: theme.regularFont,
    color: theme.textColor
  },
  touchArrow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  date: {
    fontSize: px2dp(15),
    color: theme.textColor
  },
  arrow: {
    width: px2dp(10),
    height: px2dp(18),
    marginLeft: px2dp(11)
  },
  hintView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    height: px2dp(90)
  },
  hint1View: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(90)
  },
  img: {
    width: px2dp(28),
    height: px2dp(28)
  },
  name: {
    fontSize: px2dp(14),
    color: theme.textColor
  }
})

export default Mall
