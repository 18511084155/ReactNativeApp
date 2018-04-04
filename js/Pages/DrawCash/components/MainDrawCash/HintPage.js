/**
 * Created by Joe on 2017/10/12.
 */
import React, { Component } from 'react'
import {View, StyleSheet, Image} from 'react-native'
import {LabelButton} from './../../../../Components'
import {NativeNavigation} from './../../../../Native/NativeRouter'
import {Paragraph} from './../../../../Components/Text'
import theme from './../../../../Constants/theme'
import px2dp from '../../../../Util/px2dp'

export default class HintPage extends Component {
  render () {
    return (
      <View style={styles.around}>
        <Image style={styles.img} source={require('./../../../../Assets/face.png')} />
        <Paragraph style={styles.text}>很抱歉，您的可提余额不足</Paragraph>
        <Paragraph style={styles.text}>激活享花额度或还款后即可提现</Paragraph>
        <LabelButton
          containerStyle={styles.btn}
          text='返回首页'
          onPress={() => NativeNavigation.goHome()}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  img: {
    width: px2dp(50),
    height: px2dp(50),
    marginTop: px2dp(57),
    marginBottom: px2dp(47)
  },
  text: {
    fontSize: px2dp(16),
    color: theme.textLightColor,
    fontWeight: theme.regularFont
  },
  btn: {
    marginTop: px2dp(60)
  }
})
