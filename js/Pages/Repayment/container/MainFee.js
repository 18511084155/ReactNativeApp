/**
 * Created by Joe on 2017/12/25.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableHighlight, Image, SafeAreaView} from 'react-native'
import {Fee, SwitchBtn} from './../components/MainFee/MainFeeComponents'
import {LabelButton, Toast, InitPage} from './../../../Components'
import {toastMessage} from './../../../Components/enhanced'
import { native } from './../../../Constants/static'
import px2dp from '../../../Util/px2dp'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { repayStatus } from './../static'

import { connect } from 'react-redux'
import { loadData, getDeductibleFee, goPayCenter } from './../../../Redux/actions/repayment/mainFee'
import { Paragraph } from '../../../Components/Text'

const mapStateToProps = state => ({
  loading: state.mainFee.get('loading'),
  loadingSuccess: state.mainFee.get('loadingSuccess'),
  msg: state.mainFee.get('msg'),
  data: state.mainFee.get('data').toJS()
})

const mapDispatchToProps = ({loadData, getDeductibleFee, goPayCenter})

class MainFee extends React.Component {
  constructor () {
    super(...arguments)
    this._loadData = this._loadData.bind(this)
    this._setRepaymentFee = this._setRepaymentFee.bind(this)
    this._setDeductibleFee = this._setDeductibleFee.bind(this)
    this._onChange = this._onChange.bind(this)
    this._submmit = this._submmit.bind(this)
    this.state = {
      repaymentStatus: repayStatus.input,
      fee: '',
      availableReward: 0,
      isDeductible: true
    }
    this.timer = 0
    this.preTime = new Date().getTime()
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func,
    goPayCenter: PropTypes.func,
    getDeductibleFee: PropTypes.func
  }
  componentDidMount () {
    if (global._status_ !== native.INIT) {
      this._loadData()
    }
  }
  componentWillUnmount () {
    this.timer && clearTimeout(this.timer)
  }
  _loadData () {
    this.props.loadData(data => {
      let {navigation: {state: {params = {}}}} = this.props
      let {status = global._params_.repayStatus} = params
      status && this._setRepaymentFee(status, data)
    })
  }
  _setRepaymentFee (repaymentStatus, datas) {
    let data = datas || this.props.data
    if (repaymentStatus === repayStatus.top) {
      this._setDeductibleFee(String(data.shouldRepay))
    } else if (repaymentStatus === repayStatus.low) {
      this._setDeductibleFee(String(data.lowest))
    } else {
      this._setDeductibleFee('')
    }
    this._onChange('repaymentStatus', repaymentStatus)
  }
  _setDeductibleFee (fee) {
    this._onChange('fee', fee)
    this.preTime = new Date().getTime()
    this.timer = setTimeout(() => {
      if ((new Date().getTime() - this.preTime) > 500) {
        this.props.getDeductibleFee(
          { repayAmount: fee },
          data => {
            this._onChange('availableReward', data)
          }
        )
      }
    }, 500)
  }
  _onChange (k, v) {
    this.setState({[k]: v})
  }
  _submmit () {
    let {navigation: {navigate}, goPayCenter, data} = this.props
    let {fee, isDeductible, availableReward} = this.state
    if (Number(fee) > Number(data.allAmount)) {
      this.refs.__toast__.show('还款：还款金额大于剩余应还金额！', 2000)
      return
    }
    goPayCenter(
      {
        repayAmount: fee,
        useReward: isDeductible ? availableReward : 0,
        version: data.version
      },
      paycenterNo => {
        navigate('PayCenterCard', {paycenterNo: paycenterNo})
      }
    )
  }
  render () {
    let {fee, isDeductible, repaymentStatus, availableReward} = this.state
    return (
      <InitPage refresh={this._loadData} {...this.props}>
        <SafeAreaView style={{
          flex: 1,
          backgroundColor: '#fff'
        }}>
          <KeyboardAwareScrollView
            style={styles.around}
            bounces={false}
            keyboardShouldPersistTaps='handled'
            extraScrollHeight={px2dp(150)}
          >
            <View>
              <Fee
                repaymentStatus={repaymentStatus}
                repaymentStatusBack={this._setRepaymentFee}
                value={fee}
                allAmount={this.props.data.allAmount}
                onChange={this._setDeductibleFee}
              />
            </View>
            <View style={{marginTop: px2dp(60)}}>
              <LabelButton
                text='下一步'
                onPress={this._submmit}
                editable={!global.util.isNull(fee)}
              />
            </View>
          </KeyboardAwareScrollView>
          <Toast ref='__toast__' />
        </SafeAreaView>
      </InitPage>
    )
  }
}

// <View style={{marginTop: px2dp(15)}}>
//   <SwitchBtn
//     fee={availableReward || 0}
//     value={isDeductible}
//     onChange={isDeductible => { this._onChange('isDeductible', isDeductible) }}
//   />
// </View>

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingTop: px2dp(20),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
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

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(MainFee))
