/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  SafeAreaView,
  Linking,
  Keyboard
} from 'react-native'
import { LabelButton, Picker, TouchLabel, Regions, AlertModel, InitPage } from './../../../Components'
import px2dp from './../../../Util/px2dp'
import theme from './../../../Constants/theme'
import {Paragraph} from './../../../Components/Text'
import { TitleTextInput } from './../../../Components/Input'
import {bankInfo, customerServiceNumber} from './../../../Constants/static'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import {toastMessage} from './../../../Components/enhanced'
import { connect } from 'react-redux'
import {
  loadAllowedCards,
  chooseRoute,
  sendCode,
  subInfo
} from '../../../Redux/actions/addNewCard/addNewCard'

let interval
let TIME = 61

const mapStateToProps = state => ({
  loading: state.addNewCard.get('loading'),
  loadingSuccess: state.addNewCard.get('loadingSuccess'),
  msg: state.addNewCard.get('msg'),
  data: state.addNewCard.get('data').toJS(),
  bankList: state.addNewCard.get('bankList').toJS()
})
const mapDispatchToProps = { loadAllowedCards, chooseRoute, sendCode, subInfo }
class AddNewCard extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this.subCardNo = this.subCardNo.bind(this)
    this.subPhoneNo = this.subPhoneNo.bind(this)
    this.changeVal = this.changeVal.bind(this)
    this.setBankName = this.setBankName.bind(this)
    this.setAddress = this.setAddress.bind(this)
    this.getCode = this.getCode.bind(this)
    this.customerService = this.customerService.bind(this)
    this.codeType = this.codeType.bind(this)
    this.getList = this.getList.bind(this)
    this.subInfo = this.subInfo.bind(this)
    this.state = {
      cardNo: '',
      bankCode: '',
      preservePhoneNo: '',
      address: '',
      province: '',
      city: '',
      validateCode: '',
      time: TIME
    }
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    loadAllowedCards: PropTypes.func,
    chooseRoute: PropTypes.func,
    sendCode: PropTypes.func,
    subInfo: PropTypes.func,
    bankList: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ])
  }
  componentWillMount () {
    this._init()
  }
  componentWillUnmount () {
    interval && clearInterval(interval)
    Keyboard.dismiss()
  }
  _init () {
    let {loadAllowedCards, navigation: {state: { params }}} = this.props
    loadAllowedCards({requestId: params.requestId})
  }
  subCardNo (value) {
    if (typeof value === 'undefined') {
      return ''
    }
    value = global.util.replaceAll(value, ' ', '')
    let arr = value.split('')
    for (var z = 1; z <= parseInt(arr.length / 4); z++) {
      arr[4 * z - 1] += ' '
    }
    return arr.join('').trim()
  }
  subPhoneNo (value) {
    if (typeof value === 'undefined') {
      return ''
    }
    value = global.util.replaceAll(value, ' ', '')
    let arr = value.split('')
    if (arr.length > 3 && arr.length < 8) {
      arr[2] += ' '
    }
    if (arr.length > 7) {
      arr[2] += ' '
      arr[6] += ' '
    }
    return arr.join('').trim()
  }
  changeVal (k, v) {
    if (k === 'cardNo') {
      v = this.subCardNo(v)
    }
    if (k === 'preservePhoneNo') {
      v = this.subPhoneNo(v)
    }
    this.setState({[k]: v})
  }
  setBankName (key) {
    let {chooseRoute, navigation: {state: { params }}} = this.props
    chooseRoute(
      {
        bankCode: key,
        requestId: params.requestId
      },
      () => {
        this.setState({bankCode: key})
      }
    )
  }
  setAddress (v) {
    if (v) {
      this.setState({
        province: v.province.code,
        city: v.city.code,
        address: v.province.name + v.city.name
      })
    }
  }
  getCode () {
    let {
      cardNo,
      preservePhoneNo,
      bankCode,
      province,
      city
    } = this.state
    let {sendCode, navigation: {state: { params }}} = this.props
    sendCode(
      {
        preservePhoneNo,
        cardNo,
        city,
        province,
        bankCode,
        requestId: params.requestId
      },
      () => {
        this.setState({time: TIME - 1})
        interval = setInterval(() => {
          if (this.state.time - 1 === 0) {
            this.setState({time: TIME})
            clearInterval(interval)
            return
          }
          this.setState(pre => ({time: --pre.time}))
        }, 1000)
      }
    )
  }
  customerService () {
    const url = 'tel:' + customerServiceNumber
    Linking.canOpenURL(url).then(supported => {
      if (!supported) console.log('拨打客服电话失败')
      else Linking.openURL(url).catch(() => null)
    }).catch(err => console.error('拨打客服电话:', err))
  }
  codeType () {
    let {bankCode, province, city, cardNo, preservePhoneNo} = this.state
    return !global.util.isNull(bankCode) &&
      !global.util.isNull(province) &&
      !global.util.isNull(city) &&
      !global.util.isNull(cardNo) &&
      !global.util.isNull(preservePhoneNo)
  }
  getList (list) {
    let bankList = []
    for (var z of list) {
      bankList.push({
        id: z,
        name: bankInfo[z].name
      })
    }
    return bankList
  }
  subInfo () {
    let {
      cardNo,
      province,
      city,
      validateCode
    } = this.state
    let {subInfo, navigation: {goBack, state: { params }}} = this.props
    subInfo(
      {
        validateCode,
        cardNo,
        province,
        city,
        requestId: params.requestId
      },
      () => {
        params.callback()
        goBack()
      }
    )
  }
  render () {
    let {
      cardNo,
      preservePhoneNo,
      bankCode,
      validateCode,
      address,
      time
    } = this.state
    let {bankList} = this.props
    let codeType = this.codeType()
    return (
      <InitPage refresh={this._init} {...this.props}>
        <SafeAreaView style={styles.view}>
          <KeyboardAwareScrollView
            bounces
            style={styles.around}
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={px2dp(120)}>
            <View style={styles.hintView}>
              <Paragraph style={styles.hintWord}>请绑定本人储蓄卡，否则将无法完成验证</Paragraph>
            </View>
            <View style={styles.inputView}>
              <TouchLabel
                title='开户银行'
                titleStyle={styles.titleStyle}
                hint={bankCode ? bankInfo[bankCode].name : '请选择开户银行'}
                hintStyle={bankCode ? styles.hintCheckedStyle : styles.hintStyle}
                onPress={e =>
                  this.refs.bankListPicker.show(
                    this,
                    this.setBankName
                  )
                }
              />
            </View>
            <View style={styles.inputView}>
              <TouchLabel
                title='开户省市'
                titleStyle={styles.titleStyle}
                hint={address || '请选择开户省市'}
                hintStyle={address ? styles.hintCheckedStyle : styles.hintStyle}
                hasTopLine={false}
                onPress={e => {
                  this.refs.regions.show()
                }}
              />
            </View>
            <TitleTextInput
              title='卡号'
              style={styles.input}
              value={cardNo}
              placeholder='请输入银行卡卡号'
              placeholderTextColor={theme.displayColor}
              keyboardType={'numeric'}
              underlineColorAndroid='transparent'
              onChangeText={text => this.changeVal('cardNo', text)}
            />
            <TitleTextInput
              title='预留手机号'
              style={styles.input}
              value={preservePhoneNo}
              placeholder='银行卡银行预留手机号'
              placeholderTextColor={theme.displayColor}
              keyboardType={'numeric'}
              maxLength={13}
              underlineColorAndroid='transparent'
              onChangeText={text => this.changeVal('preservePhoneNo', text)}
            >
              <TouchableOpacity onPress={e => this.refs.AlertModel.show()} style={styles.inputLogo2}>
                <Image style={styles.imgStyle} source={require('./../../../Assets/helpLogo.png')} />
              </TouchableOpacity>
            </TitleTextInput>
            <TitleTextInput
              title='验证码'
              style={styles.input}
              value={validateCode}
              placeholder='请输入短信验证码'
              placeholderTextColor={theme.displayColor}
              keyboardType={'numeric'}
              maxLength={6}
              underlineColorAndroid='transparent'
              onChangeText={text => this.changeVal('validateCode', text)}
            >
              {
                React.createElement(
                  codeType && time === TIME ? TouchableHighlight : View,
                  {
                    onPress: this.getCode,
                    style: styles.touchTime,
                    underlayColor: 'rgba(225, 225, 225, 0.75)'
                  },
                  <View style={styles.inputTime}>
                    <Paragraph style={[styles.textTime, codeType ? null : {color: theme.textColor}]}>{time === TIME ? '获取验证码' : time + '秒'}</Paragraph>
                  </View>
                )
              }
            </TitleTextInput>
            <View style={styles.labelView}>
              <LabelButton
                text='提交'
                editable={codeType && !global.util.isNull(validateCode)}
                onPress={this.subInfo}
              />
            </View>
            <View style={styles.phoneView}>
              <TouchableOpacity onPress={this.customerService}>
                <View style={styles.phoneTouch}>
                  <Image style={styles.phoneLogo} source={require('./../../../Assets/phoneLogo.png')} />
                  <Paragraph style={styles.phoneText}>联系客服</Paragraph>
                </View>
              </TouchableOpacity>
            </View>
          </KeyboardAwareScrollView>
          <Regions level={1} ref='regions' cityCallback={this.setAddress} />
          <Picker
            ref='bankListPicker'
            defaultVal={bankList.size > 0 ? bankList.getIn([0, 'id']) : 'CEB'}
            options={this.getList(bankList)}
          />
          <AlertModel
            ref='AlertModel'
            title='预留手机号说明'
            content='银行预留手机号是您办理银行卡时填写的手机号，如果忘记，请联系银行处理。'
            btnInfo={{ok: '知道了'}}
          />
        </SafeAreaView>
      </InitPage>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: '#fff'
  },
  around: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  hintTitleView: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: px2dp(25)
  },
  hintTitleImg: {
    width: px2dp(14),
    height: px2dp(14)
  },
  hintTitleWord: {
    fontSize: px2dp(14),
    color: '#666',
    marginLeft: px2dp(7)
  },
  hintView: {
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginTop: px2dp(25),
    paddingBottom: px2dp(17)
  },
  hintWord: {
    fontSize: px2dp(14),
    color: theme.themeColor
  },
  phoneView: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center'
  },
  phoneTouch: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: px2dp(25),
    paddingBottom: px2dp(20)
  },
  phoneLogo: {
    width: px2dp(10),
    height: px2dp(10)
  },
  phoneText: {
    fontSize: px2dp(12),
    color: theme.textLightColor,
    marginLeft: px2dp(5)
  },
  location: {
    marginLeft: px2dp(30)
  },
  titleStyle: {
    fontSize: px2dp(12),
    color: theme.textLightColor
  },
  hintStyle: {
    fontSize: px2dp(20),
    color: theme.displayColor
  },
  hintCheckedStyle: {
    fontSize: px2dp(20),
    color: theme.textColor
  },
  inputView: {
    flexDirection: 'column',
    justifyContent: 'center'
  },
  inputLogoView: {
    flexDirection: 'row',
    marginLeft: px2dp(20),
    marginRight: px2dp(20),
    height: px2dp(80)
  },
  imgStyle: {
    width: px2dp(20),
    height: px2dp(20),
    marginRight: px2dp(5)
  },
  inputLogo1: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    height: px2dp(80)
  },
  inputLogo2: {
    justifyContent: 'center',
    alignItems: 'flex-end',
    height: px2dp(80),
    width: px2dp(40)
  },
  inputTime: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(30),
    borderLeftWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    paddingLeft: px2dp(20),
    width: px2dp(120)
  },
  touchTime: {
    justifyContent: 'center',
    alignItems: 'center',
    height: px2dp(80)
  },
  textTime: {
    fontSize: px2dp(15),
    color: theme.themeColor
  },
  inputTitle: {
    fontSize: px2dp(12),
    color: theme.textLightColor
  },
  input: {
    fontSize: px2dp(20),
    padding: 0,
    marginTop: px2dp(5),
    width: px2dp(335),
    color: theme.textColor
  },
  labelView: {
    marginTop: px2dp(60)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(AddNewCard))
