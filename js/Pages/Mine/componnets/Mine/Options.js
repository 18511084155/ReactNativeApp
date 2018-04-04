import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet } from 'react-native'
import { TouchLabel } from './../../../../Components'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

const Options = props => {
  return (
    <View style={styles.round}>
      <TouchLabel
        title='返现账户'
        titleStyle={styles.titleStyle}
        hasTopLine={false}
        onPress={e => console.log('返现账户')}
      />
      <TouchLabel
        title='获取帮助'
        titleStyle={styles.titleStyle}
        hasTopLine={false}
        onPress={e => console.log('获取帮助')}
      />
      <TouchLabel
        title='支付密码'
        titleStyle={styles.titleStyle}
        hasTopLine={false}
        onPress={e => console.log('支付密码')}
      />
      <TouchLabel
        title='消息通知'
        titleStyle={styles.titleStyle}
        hasTopLine={false}
        hasBottomLine={false}
        onPress={e => console.log('消息通知')}
      />
      {
        props.isLogin
          ? <TouchLabel
            title='退出'
            titleStyle={styles.titleStyle}
            hasBottomLine={false}
            onPress={e => console.log('退出')}
          /> : null
      }
    </View>
  )
}

const styles = StyleSheet.create({
  round: {
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    marginTop: px2dp(10)
  },
  titleStyle: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.lightFont
  }
})

Options.propTypes = {
  isLogin: PropTypes.bool
}

export default Options
