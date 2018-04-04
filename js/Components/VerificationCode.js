import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View, TextInput,
  TouchableHighlight,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  StatusBar
} from 'react-native'
import theme from '../Constants/theme'
import {Paragraph} from '../Components/Text'
import Mask from './base/Mask'
import px2dp from '../Util/px2dp'
const hideTop = px2dp(190)
let data = {
  code: '',
  code0: '',
  code1: '',
  code2: '',
  code3: '',
  code4: '',
  code5: '',
  top: hideTop
}
let types = {
  msg: 'msg',
  pwd: 'pwd'
}
let TIME = 61
export default class VerificationCode extends Component {
  constructor () {
    super(...arguments)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this._change = this._change.bind(this)
    this._forgetPWD = this._forgetPWD.bind(this)
    this._submit = this._submit.bind(this)
    this._renderInput = this._renderInput.bind(this)
    this._getEditable = this._getEditable.bind(this)
    this._hideBack = this._hideBack.bind(this)
    this.toSendMsg = this.toSendMsg.bind(this)
    this.interval = 0
    this.state = {
      time: TIME,
      code: '',
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: '',
      top: hideTop
    }
  }
  static propTypes = {
    type: PropTypes.string,
    sendMsg: PropTypes.func,
    forgetPWD: PropTypes.func,
    submit: PropTypes.func
  }
  componentWillMount () {
    if (Platform.OS === 'android') {
      this.keyboardShowListener = Keyboard.addListener('keyboardDidShow', e => {
        this.setState({top: theme.screenHeight - e.endCoordinates.height - px2dp(220) - StatusBar.currentHeight})
      })
      this.keyboardHideListener = Keyboard.addListener('keyboardDidHide', () => {
        this.setState({top: hideTop})
        this.refs.ipt && this.refs.ipt.blur()
      })
    }
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
    this.keyboardShowListener && this.keyboardShowListener.remove()
    this.keyboardHideListener && this.keyboardHideListener.remove()
  }
  show () {
    if (this.props.type === types.msg && this.state.time === TIME) {
      this.toSendMsg(() => this.refs.background.show())
    } else {
      this.refs.background.show()
    }
  }
  hide () {
    this.refs.background.hide()
  }
  _change (text) {
    let obj = {
      code: text,
      code0: '',
      code1: '',
      code2: '',
      code3: '',
      code4: '',
      code5: ''
    }
    for (let z in text.split('')) {
      obj['code' + z] = text[z]
    }
    this.setState({...obj})
  }
  _forgetPWD () {
    let {forgetPWD = e => {}} = this.props
    this._hideBack(forgetPWD)
  }
  _submit () {
    let {code0, code1, code2, code3, code4, code5} = this.state
    let {submit = e => {}} = this.props
    this._hideBack(() => submit(code0 + code1 + code2 + code3 + code4 + code5))
  }
  _renderInput () {
    let tag = []
    for (let z = 0; z < 6; z++) {
      tag.push(
        <TouchableWithoutFeedback
          onPress={e => {
            this.refs.ipt.focus()
          }}
          key={'ipt_' + z}
        >
          <View
            style={[styles.inputItem, {borderColor: this.state['code' + z] === '' ? theme.borderColor : theme.textColor}]}
          >
            <Paragraph style={[styles.input, Platform.OS === 'ios' ? {lineHeight: px2dp(36)} : null]}>{this.state['code' + z]}</Paragraph>
          </View>
        </TouchableWithoutFeedback>
      )
    }
    return tag
  }
  _getEditable () {
    let {code0, code1, code2, code3, code4, code5} = this.state
    return (code0 + code1 + code2 + code3 + code4 + code5).length === 6
  }
  _hideBack (callback) {
    this.hide()
    this.timer = setTimeout(callback, 300)
  }
  toSendMsg (callback) {
    this.props.sendMsg(() => {
      callback()
      this.setState({time: TIME - 1})
      this.interval = setInterval(() => {
        if (this.state.time === 0) {
          clearInterval(this.interval)
          this.setState({time: TIME})
          return
        }
        this.setState((preState) => ({
          time: --preState.time
        }))
      }, 1000)
    })
  }
  render () {
    let {type = types.msg} = this.props
    let {time} = this.state
    return (
      <Mask
        ref='background'
        animationInTiming={500}
        animationOutTiming={500}
        hideCallback={() => this.setState({...data})}
        style={{justifyContent: 'flex-start', alignItems: 'center'}}
      >
        <View style={[styles.container, {marginTop: this.state.top}]}>
          <View style={styles.titleView}>
            <Paragraph style={styles.title}>{type === types.msg ? '请输入短信验证码' : '请输入支付密码'}</Paragraph>
          </View>
          <View style={styles.inputView}>
            {this._renderInput()}
          </View>
          <TextInput
            ref='ipt'
            style={{width: 0, height: 0, padding: 0, position: 'absolute', bottom: 0}}
            keyboardType={'numeric'}
            autoFocus
            value={this.state.code}
            underlineColorAndroid='transparent'
            onChangeText={text => this._change(text)}
            maxLength={6}
          />
          <View style={styles.passWordView}>
            {
              type === types.msg
                ? React.createElement(
                  time === TIME ? TouchableHighlight : View,
                  {
                    style: styles.passWordTouch,
                    onPress: this.toSendMsg,
                    underlayColor: 'rgba(225, 225, 225, 0.75)'
                  },
                  <View>
                    <Paragraph style={[styles.sendText, time === TIME ? {color: theme.textColor} : {color: theme.displayColor}]}>重新发送{time === TIME ? '' : `(${time})s`}</Paragraph>
                  </View>
                )
                : <TouchableWithoutFeedback
                  onPress={this._forgetPWD}
                >
                  <View style={styles.passWordTouch}>
                    <Paragraph style={styles.passWord}>忘记密码</Paragraph>
                  </View>
                </TouchableWithoutFeedback>
            }
          </View>
          {
            React.createElement(
              this._getEditable() ? TouchableHighlight : View,
              {
                onPress: this._submit,
                style: styles.btnTouch,
                underlayColor: 'rgba(225, 225, 225, 0.75)'
              },
              <View>
                <Paragraph style={[styles.btnText, {color: this._getEditable() ? theme.themeColor : theme.displayColor}]}>确认</Paragraph>
              </View>
            )
          }
        </View>
      </Mask>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    width: px2dp(290),
    height: px2dp(220),
    borderRadius: 6,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  titleView: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: px2dp(30)
  },
  title: {
    fontSize: px2dp(18),
    color: theme.textColor,
    fontWeight: theme.lightFont
  },
  inputView: {
    width: px2dp(290),
    flexDirection: 'row',
    marginTop: px2dp(30),
    justifyContent: 'space-between',
    paddingLeft: px2dp(15),
    paddingRight: px2dp(15)
  },
  inputItem: {
    width: px2dp(36),
    height: px2dp(36),
    borderWidth: theme.borderWidth,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0
  },
  input: {
    width: px2dp(36),
    height: px2dp(36),
    fontSize: px2dp(25),
    alignSelf: 'center',
    textAlign: 'center',
    textAlignVertical: 'center'
  },
  passWordView: {
    flexDirection: 'row',
    width: px2dp(290),
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  passWordTouch: {
    padding: px2dp(15)
  },
  sendText: {
    fontSize: px2dp(13)
  },
  passWord: {
    fontSize: px2dp(13),
    color: theme.hintColor
  },
  btnTouch: {
    flex: 1,
    width: px2dp(290),
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    alignItems: 'center',
    justifyContent: 'center'
  },
  btnText: {
    fontSize: px2dp(18)
  }
})
