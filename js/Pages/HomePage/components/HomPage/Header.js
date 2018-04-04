/**
 * Created by Joe on 2018/1/8.
 */
import React from 'react'
import {View, StyleSheet, Image} from 'react-native'
import px2dp from '../../../../Util/px2dp'
import theme from '../../../../Constants/theme'
import { Paragraph } from '../../../../Components/Text'

export default class Header extends React.Component {
  render () {
    return (
      <View style={styles.around}>
        <View style={styles.titleView}>
          <Image style={styles.logo} source={require('./../../../../Assets/logo1.png')} />
          <Paragraph style={styles.title}>
            享花服务
          </Paragraph>
          <Image style={styles.logo} source={require('./../../../../Assets/logo2.png')} />
        </View>
        <Image style={styles.shadow} source={require('./../../../../Assets/shadow.png')} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  titleView: {
    width: theme.screenWidth,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(28),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    backgroundColor: '#fff'
  },
  logo: {
    width: px2dp(34),
    height: px2dp(17)
  },
  title: {
    fontSize: px2dp(18),
    color: theme.textColor,
    fontWeight: theme.regularFont,
    marginLeft: px2dp(10),
    marginRight: px2dp(10)
  },
  shadow: {
    width: theme.screenWidth,
    height: px2dp(30)
  }
})
