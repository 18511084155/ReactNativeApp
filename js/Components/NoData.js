/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, Image, SafeAreaView} from 'react-native'
import px2dp from '../Util/px2dp'
import theme from '../Constants/theme'
import { Paragraph } from '../Components/Text'

export default class NoData extends React.Component {
  static  propTypes = {
    title: PropTypes.string
  }
  render () {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
        <View style={styles.around}>
          <Image source={require('./../Assets/noBill.png')} />
          <Paragraph style={styles.text}>{this.props.title}</Paragraph>
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: px2dp(60)
  },
  text: {
    fontSize: px2dp(13),
    color: theme.displayColor,
    marginTop: px2dp(25)
  }
})
