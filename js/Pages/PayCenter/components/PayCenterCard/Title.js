import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { Paragraph, Heading } from './../../../../Components/Text'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

/**
 * proprs：
 *  fee:金额
 */

const Title = props => {
  let {fee = ''} = props
  return (
    <View style={styles.around}>
      <Paragraph style={styles.title}>还款金额</Paragraph>
      <Heading style={styles.fee}>{fee}</Heading>
    </View>
  )
}

const styles = StyleSheet.create({
  around: {//
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  title: {
    fontSize: px2dp(14),
    color: theme.textColor
  },
  fee: {
    fontSize: px2dp(30),
    color: theme.textColor,
    marginTop: px2dp(10),
    marginBottom: px2dp(56)
  }
})

Title.propTypes = {
  fee: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ])
}

export default Title
