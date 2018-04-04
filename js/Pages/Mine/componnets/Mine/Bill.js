import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Heading } from './../../../../Components/Text'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

const Bill = props => {
  let {isLogin} = props
  return (
    <View style={styles.round}>
      <View style={styles.titleView}>
        <Paragraph style={styles.title}>享花账单</Paragraph>
        { isLogin ? <Paragraph style={styles.date}>每月7日还款</Paragraph> : null }
      </View>
      <View style={styles.hintView}>
        <View style={styles.hint1View}>
          { isLogin ? <Heading style={styles.fee}>300.00</Heading> : null }
          <Paragraph style={styles.name}>本月待还</Paragraph>
        </View>
        <View style={styles.hint1View}>
          { isLogin ? <Heading style={styles.fee}>100.00</Heading> : null }
          <Paragraph style={styles.name}>本月最低应还</Paragraph>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  round: {
    flexDirection: 'column',
    backgroundColor: '#fff'
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
  date: {
    fontSize: px2dp(15),
    fontWeight: theme.regularFont,
    color: theme.displayColor
  },
  hintView: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginLeft: px2dp(20),
    marginRight: px2dp(20)
  },
  hint1View: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(20),
    paddingBottom: px2dp(20)
  },
  fee: {
    fontSize: px2dp(17),
    color: theme.textColor,
    paddingBottom: px2dp(7)
  },
  name: {
    fontSize: px2dp(14),
    fontWeight: theme.regularFont,
    color: theme.textColor
  }
})

Bill.propTypes = {
  isLogin: PropTypes.bool
}

export default Bill
