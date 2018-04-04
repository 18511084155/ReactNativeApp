/**
 * Created by Joe on 2017/12/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, SafeAreaView } from 'react-native'
import { Paragraph } from './../../../Components/Text'
import { LabelButton } from './../../../Components'
import px2dp from './../../../Util/px2dp'
import theme from './../../../Constants/theme'
import { NativeNavigation } from './../../../Native/NativeRouter'

export default class PayFailed extends React.Component {
  constructor () {
    super(...arguments)
    this.state = {
      isLine: true
    }
  }
  static propTypes = {
    navigation: PropTypes.object
  }
  render () {
    let { isLine } = this.state
    let { navigation: {state: {params}} } = this.props
    return (
      <SafeAreaView style={styles.around}>
        <View>
          <Image style={styles.img} source={require('./../../../Assets/failed.png')} />
        </View>
        <View>
          <Paragraph style={styles.title}>还款失败</Paragraph>
        </View>
        <View
          onLayout={({nativeEvent: {layout: {width}}}) => {
            if (width < px2dp(305) && isLine) {
              this.setState({isLine: true})
            } else {
              this.setState({isLine: false})
            }
          }}
          style={[styles.reasonView, {flexDirection: isLine ? 'row' : 'column'}]}
        >
          <Paragraph style={styles.hint}>您的还款失败原因：</Paragraph>
          <Paragraph style={styles.hint}>{params.msg}</Paragraph>
        </View>
        <View style={{marginTop: isLine ? px2dp(60) : px2dp(38)}}>
          <LabelButton
            text='完成'
            onPress={() => NativeNavigation.goHome()}
          />
        </View>
      </SafeAreaView>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  img: {
    marginTop: px2dp(50),
    width: px2dp(45),
    height: px2dp(45)
  },
  title: {
    fontSize: px2dp(20),
    color: theme.textColor,
    marginTop: px2dp(20),
    fontWeight: theme.mediumFont
  },
  hint: {
    fontSize: px2dp(16),
    color: theme.textLightColor,
    marginTop: px2dp(8)
  },
  reasonView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15)
  }
})
