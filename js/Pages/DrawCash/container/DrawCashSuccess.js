/**
 * Created by Joe on 2017/12/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Paragraph } from './../../../Components/Text'
import { LabelButton } from './../../../Components'
import px2dp from './../../../Util/px2dp'
import {NativeNavigation} from './../../../Native/NativeRouter'
import theme from './../../../Constants/theme'

const DrawCashSuccess = props => {
  return (
    <SafeAreaView style={{
      flex: 1,
      backgroundColor: '#fff'
    }}>
      <View style={styles.around}>
        <View>
          <Image style={styles.img} source={require('./../../../Assets/paySccess.png')} />
        </View>
        <View>
          <Paragraph style={styles.title}>提现申请已提交</Paragraph>
        </View>
        <View>
          <Paragraph style={styles.hint}>请等待短信或App消息通知</Paragraph>
        </View>
        <View style={{marginTop: px2dp(60)}}>
          <LabelButton
            text='完成'
            onPress={() => NativeNavigation.goHome()}
          />
        </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingTop: px2dp(50),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  img: {
    width: px2dp(45),
    height: px2dp(45)
  },
  title: {
    fontSize: px2dp(20),
    color: theme.textColor,
    marginTop: px2dp(20)
  },
  hint: {
    fontSize: px2dp(16),
    color: theme.textLightColor,
    marginTop: px2dp(8)
  }
})

DrawCashSuccess.propTypes = {
  navigation: PropTypes.object
}

export default DrawCashSuccess

