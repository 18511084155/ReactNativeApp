/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, SafeAreaView} from 'react-native'
import {LabelButton, BankCardList, VerificationCode, InitPage} from './../../../Components'
import Title from './../components/DrawCashCenter/Title'
import px2dp from '../../../Util/px2dp'
import { options } from '../../../Constants/static'
import {toastMessage} from './../../../Components/enhanced'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { loadData, setSelectedCard, bindCard, subInfo } from './../../../Redux/actions/drawCash/drawCashCenter'

const mapStateToProps = state => ({
  loading: state.drawCashCenter.get('loading'),
  loadingSuccess: state.drawCashCenter.get('loadingSuccess'),
  list: state.drawCashCenter.get('list').toJS(),
  selected: state.drawCashCenter.get('selected').toJS(),
  data: state.drawCashCenter.get('data'),
  msg: state.drawCashCenter.get('msg')
})

const mapDispatchToProps = ({loadData, setSelectedCard, bindCard, subInfo})

class DrawCashCenter extends React.Component {
  constructor () {
    super(...arguments)
    this._loadData = this._loadData.bind(this)
    this._inputPwd = this._inputPwd.bind(this)
    this._onBind = this._onBind.bind(this)
    this._bindCard = this._bindCard.bind(this)
    this._submit = this._submit.bind(this)
    this._forgetPWD = this._forgetPWD.bind(this)
  }
  static propTypes = {
    navigation: PropTypes.object,
    loadData: PropTypes.func,
    setSelectedCard: PropTypes.func,
    bindCard: PropTypes.func,
    subInfo: PropTypes.func,
    list: PropTypes.array,
    selected: PropTypes.object
  }
  componentWillMount () {
    this._loadData()
  }
  _loadData () {
    let { navigation, loadData } = this.props
    loadData(
      {
        requestId: navigation.state.params.payRequestId
      }
    )
  }
  _inputPwd () {
    this._bindCard(
      () => {
        this.refs.VerificationCode.show()
      }
    )
  }
  _onBind () {
    let { navigation: {state: { params }} } = this.props
    this.props.navigation.navigate(
      'AddNewCard',
      {
        requestId: params.payRequestId,
        callback: this._loadData
      }
    )
  }
  _bindCard (callback) {
    let { bindCard, selected, navigation: {state: {params}} } = this.props
    bindCard(
      {
        cardBindInfoId: selected.cardBindInfoId,
        requestId: params.payRequestId
      },
      callback
    )
  }
  _submit (verificationCode) {
    if (verificationCode.length === 6) {
      let { subInfo, navigation: {navigate, state: {params}} } = this.props
      subInfo(
        {
          loanAmount: params.loanAmount,
          merchantCode: options.merchantCode,
          payPwd: verificationCode,
          payRequestId: params.payRequestId,
          purpose: params.purpose
        },
        () => {
          navigate('DrawCashSuccess')
        }
      )
    }
  }
  _forgetPWD () {
    this.refs.VerificationCode.hide()
    this.props.navigation.navigate('PayPassWord')
  }
  render () {
    let {list, selected, setSelectedCard, navigation} = this.props
    return (
      <InitPage refresh={this._loadData} {...this.props} >
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <KeyboardAwareScrollView
            style={styles.around}
            bounces
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={px2dp(150)}
          >
            <View style={{flex: 1}}>
              <Title fee={navigation.state.params.loanAmount} />
            </View>
            <View style={{flex: 1}}>
              <BankCardList
                list={list}
                selected={selected}
                onChange={setSelectedCard}
                onBind={this._onBind}
              />
            </View>
            <View style={{flex: 1, marginTop: px2dp(60)}}>
              <LabelButton
                text='确认支付'
                editable={!global.util.isEmptyObject(selected)}
                onPress={this._inputPwd}
              />
            </View>
          </KeyboardAwareScrollView>
          <VerificationCode ref='VerificationCode' type='pwd' forgetPWD={this._forgetPWD} submit={this._submit} />
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
    paddingTop: px2dp(38),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(DrawCashCenter))
