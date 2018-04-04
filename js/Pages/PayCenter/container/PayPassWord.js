/**
 * Created by Joe on 2017/12/28.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, Image, TouchableHighlight, SafeAreaView } from 'react-native'
import { Paragraph } from './../../../Components/Text'
import { LabelButton, InitPage } from './../../../Components'
import { TitleTextInput } from './../../../Components/Input'
import px2dp from './../../../Util/px2dp'
import theme from './../../../Constants/theme'

import {toastMessage} from './../../../Components/enhanced'
import { connect } from 'react-redux'
import {getPicCaptcha, sendValidCode, subInfo} from '../../../Redux/actions/payCenter/payPassWord'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const mapStateToProps = state => ({
  loading: state.payPassWord.get('loading'),
  loadingSuccess: state.payPassWord.get('loadingSuccess'),
  msg: state.payPassWord.get('msg'),
  captcha: state.payPassWord.get('captcha').toJS()
})
const mapDispatchToProps = {getPicCaptcha, sendValidCode, subInfo}

let __TIME__ = 61

class PayPassWord extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._changeVal = this._changeVal.bind(this)
    this._sendValidCode = this._sendValidCode.bind(this)
    this._submit = this._submit.bind(this)
    this.state = {
      name: '',
      cardNo: '',
      picCaptcha: '',
      numCaptcha: '',
      password: '',
      secureTextEntry: true,
      time: __TIME__
    }
    this.show = require('./../../../Assets/show.png')
    this.hide = require('./../../../Assets/hide.png')
  }
  static propTypes = {
    navigation: PropTypes.object,
    getPicCaptcha: PropTypes.func,
    sendValidCode: PropTypes.func,
    subInfo: PropTypes.func,
    captcha: PropTypes.object
  }
  componentWillMount () {
    this._init()
  }
  componentWillUnmount () {
    this.interval && clearInterval(this.interval)
  }
  _init () {
    this.props.getPicCaptcha()
  }
  _changeVal (k, v) {
    this.setState({[k]: v})
  }
  _sendValidCode () {
    let { sendValidCode, captcha } = this.props
    sendValidCode(
      {
        captchaId: captcha.imageId,
        captchaValue: this.state.picCaptcha,
        type: 2
      },
      () => {
        let {time} = this.state
        this.setState({time: --time})
        this.interval = setInterval(() => {
          if (time === 0) {
            this.setState({time: __TIME__})
            clearInterval(this.interval)
          } else {
            this.setState({time: --time})
          }
        }, 1000)
      }
    )
  }
  _submit () {
    let {name, cardNo, numCaptcha, password} = this.state
    this.props.subInfo(
      {
        idCard: cardNo,
        name: name,
        newPwd: password,
        validCode: numCaptcha
      },
      () => {
        this.props.navigation.goBack()
      }
    )
  }
  render () {
    let {name, cardNo, picCaptcha, numCaptcha, password, secureTextEntry, time} = this.state
    let {captcha, getPicCaptcha} = this.props
    let sendAble = time === __TIME__
    return (
      <InitPage refresh={this._init} {...this.props}>
        <SafeAreaView style={styles.around}>
          <KeyboardAwareScrollView
            style={styles.view}
            bounces
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={px2dp(150)}
          >
            <View style={styles.hintView}>
              <Paragraph style={styles.hint}>重置支付密码</Paragraph>
            </View>
            <TitleTextInput
              title='姓名'
              style={styles.input}
              value={name}
              placeholder='请输入姓名'
              placeholderTextColor={theme.displayColor}
              underlineColorAndroid='transparent'
              onChangeText={text => this._changeVal('name', text)}
            />
            <TitleTextInput
              title='身份证号码'
              style={styles.input}
              value={cardNo}
              placeholder='请输入身份证号码'
              placeholderTextColor={theme.displayColor}
              underlineColorAndroid='transparent'
              onChangeText={text => this._changeVal('cardNo', text)}
            />
            <TitleTextInput
              title='图片验证码'
              style={styles.input}
              maxLength={4}
              value={picCaptcha}
              keyboardType={'numeric'}
              placeholder='请输入图片验证码'
              placeholderTextColor={theme.displayColor}
              underlineColorAndroid='transparent'
              onChangeText={text => this._changeVal('picCaptcha', text)}
            >
              <TouchableHighlight underlayColor={'rgba(225, 225, 225, 0.75)'} onPress={getPicCaptcha} style={styles.touchView}>
                <Image resizeMode={'contain'} style={styles.picCaptcha} source={{uri: captcha.image}} />
              </TouchableHighlight>
            </TitleTextInput>
            <TitleTextInput
              title='手机验证码'
              style={styles.input}
              value={numCaptcha}
              maxLength={6}
              keyboardType={'numeric'}
              placeholder='请输入手机验证码'
              placeholderTextColor={theme.displayColor}
              underlineColorAndroid='transparent'
              onChangeText={text => this._changeVal('numCaptcha', text)}
            >
              {
                React.createElement(
                  sendAble ? TouchableHighlight : View,
                  {
                    onPress: this._sendValidCode,
                    underlayColor: 'rgba(225, 225, 225, 0.75)',
                    style: styles.touchView
                  },
                  <View style={styles.numCaptchaView}>
                    <Paragraph style={[styles.numCaptcha, {color: sendAble ? theme.textColor : theme.displayColor}]}>{sendAble ? '获取验证码' : time}</Paragraph>
                  </View>
                )
              }
            </TitleTextInput>
            <TitleTextInput
              title='新支付密码'
              style={styles.input}
              value={password}
              keyboardType={'numeric'}
              maxLength={6}
              secureTextEntry={secureTextEntry}
              placeholder='请输入6位数字'
              placeholderTextColor={theme.displayColor}
              underlineColorAndroid='transparent'
              onChangeText={text => this._changeVal('password', text)}
            >
              <TouchableHighlight
                underlayColor={'rgba(225, 225, 225, 0.75)'}
                onPress={text => this._changeVal('secureTextEntry', !secureTextEntry)}
                style={styles.touchView}
              >
                <View style={styles.secureTextEntryView}>
                  <Image
                    style={styles.secureTextEntry}
                    source={secureTextEntry ? this.hide : this.show}
                  />
                </View>
              </TouchableHighlight>
            </TitleTextInput>
            <View style={{marginTop: px2dp(60)}}>
              <LabelButton
                text='完成'
                editable={
                  !global.util.isNull(name) &&
                  !global.util.isNull(cardNo) &&
                  !global.util.isNull(picCaptcha) &&
                  !global.util.isNull(numCaptcha) &&
                  !global.util.isNull(password)
                }
                onPress={this._submit}
              />
            </View>
          </KeyboardAwareScrollView>
        </SafeAreaView>
      </InitPage>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    backgroundColor: '#fff'
  },
  view: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: px2dp(15),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  hintView: {
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    paddingBottom: px2dp(15)
  },
  hint: {
    fontSize: px2dp(14),
    color: theme.themeColor
  },
  input: {
    fontSize: px2dp(20),
    padding: 0,
    color: theme.textColor
  },
  touchView: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  picCaptcha: {
    width: px2dp(63),
    height: px2dp(33)
  },
  numCaptchaView: {
    width: px2dp(100),
    height: px2dp(30),
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    paddingLeft: px2dp(20)
  },
  numCaptcha: {
    fontSize: px2dp(15),
    color: theme.textColor
  },
  secureTextEntryView: {
    justifyContent: 'center',
    paddingLeft: px2dp(20)
  },
  secureTextEntry: {
    width: px2dp(17),
    height: px2dp(9)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(PayPassWord))
