/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, SafeAreaView} from 'react-native'
import {LabelButton, BankCardList, VerificationCode, InitPage} from './../../../Components'
import Title from './../components/PayCenterCard/Title'
import px2dp from '../../../Util/px2dp'
import {toastMessage} from './../../../Components/enhanced'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import {
  loadData,
  setSelectedCard,
  subInfo,
  bindCard,
  repayInit,
  loadAmount,
  sendMsg
} from './../../../Redux/actions/payCenter/payCenterCard'

const mapStateToProps = state => ({
  loading: state.payCenterCard.get('loading'),
  loadingSuccess: state.payCenterCard.get('loadingSuccess'),
  list: state.payCenterCard.get('list').toJS(),
  selected: state.payCenterCard.get('selected').toJS(),
  amount: state.payCenterCard.get('amount'),
  data: state.payCenterCard.get('data'),
  msg: state.payCenterCard.get('msg')
})

const mapDispatchToProps = ({
  loadData,
  loadAmount,
  setSelectedCard,
  subInfo,
  bindCard,
  repayInit,
  sendMsg
})

class PayCenterCard extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._bindAndInit = this._bindAndInit.bind(this)
    this._openMsg = this._openMsg.bind(this)
    this._onBind = this._onBind.bind(this)
    this._sendMsg = this._sendMsg.bind(this)
    this._forgetPWD = this._forgetPWD.bind(this)
    this._submit = this._submit.bind(this)
    this.firstEnter = true
  }
  static propTypes = {
    navigation: PropTypes.object,
    loadData: PropTypes.func,
    loadAmount: PropTypes.func,
    amount: PropTypes.oneOfType([ PropTypes.string, PropTypes.number ]),
    setSelectedCard: PropTypes.func,
    bindCard: PropTypes.func,
    subInfo: PropTypes.func,
    repayInit: PropTypes.func,
    sendMsg: PropTypes.func,
    list: PropTypes.array,
    selected: PropTypes.object
  }
  componentWillMount () {
    this._init()
  }
  _init () {
    let { navigation, loadData, loadAmount } = this.props
    loadData(
      {
        requestId: navigation.state.params.paycenterNo
      }
    )
    loadAmount(
      {
        requestId: navigation.state.params.paycenterNo
      }
    )
  }
  _bindAndInit (callback) {
    let { bindCard, repayInit, selected, navigation } = this.props
    bindCard(
      {
        cardBindInfoId: selected.cardBindInfoId,
        requestId: navigation.state.params.paycenterNo
      },
      () => {
        repayInit(
          {
            requestId: navigation.state.params.paycenterNo
          },
          () => {
            callback()
          }
        )
      }
    )
  }
  _openMsg () {
    this._bindAndInit(() => {
      this.refs.VerificationCode.show()
    })
  }
  _onBind () {
    let { navigation: {state: { params }} } = this.props
    this.props.navigation.navigate(
      'AddNewCard',
      {
        requestId: params.paycenterNo,
        callback: this._init
      }
    )
  }
  _sendMsg (callback) {
    let { sendMsg, navigation } = this.props
    sendMsg(
      {
        requestId: navigation.state.params.paycenterNo,
        firstEnter: this.firstEnter
      },
      () => {
        this.firstEnter = false
        callback()
      }
    )
  }
  _forgetPWD () {
    this.props.navigation.navigate('PayPassWord')
  }
  _submit (verificationCode) {
    if (verificationCode.length === 6) {
      let { subInfo, navigation: {navigate, state: {params}} } = this.props
      subInfo(
        {
          validateCode: verificationCode,
          requestId: params.paycenterNo
        },
        (success, msg) => {
          navigate(success ? 'PaySuccess' : 'PayFailed', {msg: msg})
        }
      )
    }
  }
  render () {
    let {list, selected, setSelectedCard, amount} = this.props
    return (
      <InitPage refresh={this._init} {...this.props}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <KeyboardAwareScrollView
            style={styles.around}
            bounces
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={px2dp(150)}
          >
            <View style={{flex: 1, marginTop: px2dp(38)}}>
              <Title fee={amount} />
            </View>
            <View style={{flex: 1}}>
              <BankCardList
                list={list}
                selected={selected}
                onChange={setSelectedCard}
                onBind={this._onBind}
              />
            </View>
            <View style={{flex: 1, marginTop: px2dp(60), marginBottom: px2dp(87)}}>
              <LabelButton
                text='确认支付'
                editable={!global.util.isEmptyObject(selected)}
                onPress={this._openMsg}
              />
            </View>
          </KeyboardAwareScrollView>
          <VerificationCode
            ref='VerificationCode'
            type='msg'
            sendMsg={this._sendMsg}
            submit={this._submit}
            forgetPWD={this._forgetPWD}
          />
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
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(PayCenterCard))
