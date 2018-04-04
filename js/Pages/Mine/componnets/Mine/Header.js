import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { Paragraph, Heading } from './../../../../Components/Text'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

const Header = props => {
  return (
    <ImageBackground
      source={require('./../../../../Assets/mineBGI.png')}
      resizeMode='contain'
      style={styles.round}
    >
      <View>
        {
          props.isLogin
            ? <View style={styles.loginWordView}>
              <Paragraph style={styles.name}>迈克尔·法斯宾德</Paragraph>
              <Paragraph style={styles.phone}>185*****567</Paragraph>
            </View>
            : <TouchableOpacity style={styles.loginWordView}>
              <Heading style={styles.loginWord}>登录/注册</Heading>
            </TouchableOpacity>
        }
      </View>
      <View style={styles.headLogoView}>
        <Image style={styles.headLogo} source={require('./../../../../Assets/headLogo.png')} />
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  round: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: theme.screenWidth,
    height: px2dp(190)
  },
  headLogoView: {
    paddingRight: px2dp(20)
  },
  headLogo: {
    width: px2dp(50),
    height: px2dp(50)
  },
  loginWordView: {
    padding: px2dp(20)
  },
  name: {
    fontSize: px2dp(22),
    color: '#fff'
  },
  phone: {
    fontSize: px2dp(16),
    color: '#fff'
  },
  loginWord: {
    fontSize: px2dp(22),
    color: '#fff'
  }
})

Header.propTypes = {
  isLogin: PropTypes.bool
}

export default Header
