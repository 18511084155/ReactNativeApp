/**
 * Created by Joe on 2017/12/25.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, SafeAreaView, StyleSheet, TextInput, TouchableHighlight, TouchableWithoutFeedback, StatusBar, Image} from 'react-native'
import FeeInfo from './../components/MainDrawCash/FeeInfo'
import HintPage from './../components/MainDrawCash/HintPage'
import {LabelButton, AlertModel, TouchLabel, Picker, InitPage, Toast} from './../../../Components'
import {toastMessage} from './../../../Components/enhanced'
import px2dp from '../../../Util/px2dp'
import {native, webUrl} from '../../../Constants/static'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Paragraph, Heading } from '../../../Components/Text'
import { strValid } from '../../../Util/validate'
import theme from '../../../Constants/theme'

import { connect } from 'react-redux'
import { loadData, loadPurposeList, getPayRequestId } from './../../../Redux/actions/drawCash/mainDrawCash'
import { NavigationActions } from 'react-navigation'

const resetAction = NavigationActions.reset({
  index: 0,
  actions: [
    NavigationActions.navigate({routeName: 'MainDrawCash'})
  ]
})

const mapStateToProps = state => ({
  loading: state.mainDrawCash.get('loading'),
  loadingSuccess: state.mainDrawCash.get('loadingSuccess'),
  msg: state.mainDrawCash.get('msg'),
  data: state.mainDrawCash.get('data').toJS(),
  purposeList: state.mainDrawCash.get('purposeList').toJS()
})

const mapDispatchToProps = ({ loadData, loadPurposeList, getPayRequestId })

class MainDrawCash extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._onChange = this._onChange.bind(this)
    this._goPage = this._goPage.bind(this)
    this._setPurpose = this._setPurpose.bind(this)
    this.state = {
      loanAmount: '',
      purposeId: '',
      purposeName: '去选择'
    }
    this.timer = 0
    this.preTime = new Date().getTime()
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    purposeList: PropTypes.array,
    getPayRequestId: PropTypes.func,
    loadData: PropTypes.func,
    loadPurposeList: PropTypes.func
  }
  componentWillMount () {
    if (global._status_ !== native.INIT) {
      this._init(this.state.loanAmount)
    }
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  _init (loanAmount) {
    this.props.loadPurposeList(() => {
      if (loanAmount && !strValid('float2', loanAmount)) {
        this.refs.__toast__.show(`提现金额应为不超过两位小数的数字`, 2000)
        return
      }
      this.props.loadData({loanAmount})
    })
  }
  _onChange (k, v) {
    this.setState({[k]: v})
    this.preTime = new Date().getTime()
    this.timer = setTimeout(() => {
      if ((new Date().getTime() - this.preTime) > 500) {
        this._init(v)
      }
    }, 500)
  }
  _goPage () {
    let {navigation: {navigate}, getPayRequestId, data} = this.props
    let {loanAmount, purposeId} = this.state
    if (!strValid('float2', loanAmount)) {
      this.refs.__toast__.show(`提现金额应为不超过两位小数的数字`, 2000)
      return
    }
    if (Number(loanAmount) < Number(data.minAmount) || Number(loanAmount) > Number(data.maxAmount)) {
      this.refs.__toast__.show(`可提现金额应在${data.minAmount}-${data.maxAmount}之间`, 2000)
      return
    }
    getPayRequestId(data => {
      navigate(
        'DrawCashCenter',
        {
          loanAmount: loanAmount,
          purpose: purposeId,
          payRequestId: data.payRequestId
        }
      )
    })
    // this.refs.AlertError.show()
  }
  _setPurpose (v) {
    let {purposeList} = this.props
    for (let z of purposeList) {
      if (v === z.id) {
        this.setState({
          purposeId: z.id,
          purposeName: z.name
        })
        break
      }
    }
  }
  render () {
    let {loanAmount, purposeId, purposeName} = this.state
    let {navigation: {dispatch, navigate}, data, purposeList} = this.props
    return (
      <InitPage refresh={() => this._init(loanAmount)} {...this.props}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <StatusBar barStyle='dark-content' />
          {
            global._status_ !== native.INIT && global._params_.isActive
              ? <View style={{flex: 1, backgroundColor: '#fff'}}>
                <KeyboardAwareScrollView
                  style={styles.around}
                  bounces={false}
                  keyboardShouldPersistTaps='handled'
                  extraScrollHeight={px2dp(200)}
                >
                  <View>
                    <Paragraph style={styles.title}>单笔可借{data.minAmount} - {data.maxAmount}元</Paragraph>
                    <View style={styles.inputView}>
                      <Heading style={styles.logo}>￥</Heading>
                      <TextInput
                        style={styles.input}
                        keyboardType={'numeric'}
                        placeholder='请输入提现金额'
                        placeholderTextColor={theme.placeholderColor}
                        underlineColorAndroid='transparent'
                        value={loanAmount}
                        onChangeText={text => this._onChange('loanAmount', text)}
                      />
                    </View>
                  </View>
                  {
                    global.util.isNull(loanAmount) ? null : <FeeInfo
                      data={data}
                      feeTouch={e => this.refs.AlertModel.show()}
                    />
                  }
                  {
                    global.util.isNull(loanAmount) ? null : <View style={styles.touchView}>
                      <TouchLabel
                        title='提现用途'
                        status={purposeName}
                        showStatus
                        titleStyle={styles.titleStyle}
                        onPress={e =>
                          this.refs.purposePicker.show(
                            this,
                            this._setPurpose
                          )
                        }
                      />
                    </View>
                  }
                  <View>
                    {
                      global.util.isNull(loanAmount)
                        ? null
                        : <View style={styles.labelView}>
                          <Paragraph style={styles.hint}>已确认并同意</Paragraph>
                          <TouchableWithoutFeedback
                            onPress={
                              e => navigate('CommonWebView', {url: webUrl.drawCashAgreement})
                            }
                            style={styles.hintTouchView}
                          >
                            <View>
                              <Paragraph style={styles.hintTouch}>《享花借款协议》</Paragraph>
                            </View>
                          </TouchableWithoutFeedback>
                        </View>
                    }
                    <LabelButton
                      containerStyle={
                        global.util.isNull(loanAmount)
                        ? {marginTop: px2dp(61)}
                        : null
                      }
                      text='下一步'
                      onPress={this._goPage}
                      editable={!global.util.isNull(loanAmount) && !global.util.isNull(purposeId)}
                    />
                  </View>
                </KeyboardAwareScrollView>
                <AlertModel
                  ref='AlertModel'
                  title='手续费手续费手续费手续费手续费手续费'
                  btnInfo={{ok: '知道了'}}
                />
                <AlertModel
                  ref='AlertError'
                  title='您的享花额度尚未激活！'
                  okCallback={() => { dispatch(resetAction) }}
                  btnInfo={{cancel: '取消', ok: '去激活'}}
                />
                <Toast ref='__toast__' />
                <Picker
                  ref='purposePicker'
                  defaultVal={purposeList.length > 0 ? purposeList[0].id : 1}
                  options={purposeList}
                />
              </View>
              : <HintPage navigation={this.props.navigation} />
          }
        </SafeAreaView>
      </InitPage>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: px2dp(20),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  title: {
    fontSize: px2dp(12),
    color: theme.textColor
  },
  inputView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingTop: px2dp(15),
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  logo: {
    fontSize: px2dp(30),
    color: theme.textColor,
    fontWeight: theme.regularFont,
    marginRight: px2dp(5),
    marginBottom: px2dp(10)
  },
  input: {
    flex: 1,
    fontSize: px2dp(30),
    fontWeight: theme.regularFont,
    color: theme.textColor,
    marginBottom: px2dp(10)
  },
  titleStyle: {
    fontSize: px2dp(20),
    fontWeight: theme.lightFont,
    color: theme.textColor
  },
  touchView: {
    flex: 1,
    marginTop: px2dp(35)
  },
  labelView: {
    height: px2dp(60),
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'flex-end'
  },
  hint: {
    fontSize: px2dp(13),
    color: theme.textColor,
    marginBottom: px2dp(13)
  },
  hintTouch: {
    fontSize: px2dp(13),
    color: theme.themeColor,
    paddingBottom: px2dp(13)
  },
  hintTouchView: {
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  backView: {
    flex: 1,
    padding: px2dp(13),
    paddingLeft: px2dp(15),
    justifyContent: 'center',
    alignItems: 'center'
  },
  backImg: {
    width: px2dp(20),
    height: px2dp(20)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(MainDrawCash))
