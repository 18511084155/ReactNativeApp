import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, ImageBackground } from 'react-native'
import px2dp from '../../../../Util/px2dp'
import theme from './../../../../Constants/theme'

/**
 * proprs：
 *  fee:金额
 */

const Card = props => {
  return (
    <ImageBackground source={require('./../../../../Assets/card.png')} resizeMode='contain' style={styles.card}>
      <View style={styles.around}>
        {props.children}
      </View>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  card: {
    justifyContent: 'center',
    alignItems: 'center',
    width: theme.screenWidth,
    height: px2dp(250)
  },
  around: {
    width: px2dp(344),
    height: px2dp(217),
    borderRadius: 13
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

Card.propTypes = {
  children: PropTypes.object
}

export default Card
