/**
 * Created by Joe on 2017/10/12.
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native'
import {Paragraph} from './../../../../Components/Text'
import theme from './../../../../Constants/theme'
import px2dp from '../../../../Util/px2dp'

export default class FeeInfo extends Component {
  static propTypes = {
    data: PropTypes.object,
    feeTouch: PropTypes.func
  }
  render () {
    let { data } = this.props
    return (
      <View style={styles.around}>
        <View style={styles.itemView}>
          <Paragraph style={styles.title}>最后还款日</Paragraph>
          <Paragraph style={styles.inner}>{data.dueDate}</Paragraph>
        </View>
        <View style={styles.itemView}>
          <View style={styles.titleView}>
            <Paragraph style={styles.title}>提现手续费</Paragraph>
          </View>
          <Paragraph style={styles.inner}>{data.commission}元</Paragraph>
        </View>
      </View>
    )
  }
}

// <Paragraph style={styles.title}>提现手续费</Paragraph> -->↓↓↓
// <TouchableOpacity onPress={this.props.feeTouch} style={styles.touchLogo}>
//   <Image style={styles.logo} source={require('./../../../../Assets/info.png')} />
// </TouchableOpacity>

const styles = StyleSheet.create({
  around: {
    flex: 1
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  titleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  title: {
    marginTop: px2dp(15),
    fontSize: px2dp(14),
    color: theme.textLightColor
  },
  touchLogo: {
    paddingLeft: px2dp(10),
    paddingRight: px2dp(20),
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    marginTop: px2dp(15),
    width: px2dp(13),
    height: px2dp(13)
  },
  inner: {
    fontSize: px2dp(14),
    color: theme.textColor
  }
})
