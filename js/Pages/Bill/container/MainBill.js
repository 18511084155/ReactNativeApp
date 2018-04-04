/**
 * Created by Joe on 2018/1/3.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {View, StyleSheet, TouchableHighlight, Image, SafeAreaView} from 'react-native'
import {toastMessage} from './../../../Components/enhanced'
import px2dp from '../../../Util/px2dp'
import { native } from '../../../Constants/static'
import {repayStatus} from '../static'
import theme from '../../../Constants/theme'
import {Header, Body} from './../components/MainBill'
import { Paragraph } from '../../../Components/Text'
import { RepaymentCheckbox, InitPage } from '../../../Components'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

import { connect } from 'react-redux'
import { loadData } from './../../../Redux/actions/bill/mainBill'

const mapStateToProps = state => ({
  loading: state.mainBill.get('loading'),
  loadingSuccess: state.mainBill.get('loadingSuccess'),
  msg: state.mainBill.get('msg'),
  data: state.mainBill.get('data').toJS()
})

const mapDispatchToProps = ({loadData})

class MainBill extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this.state = {
      fee: ''
    }
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    loadData: PropTypes.func
  }
  componentWillMount () {
    if (global._status_ !== native.INIT) {
      this._init()
    }
  }
  _init () {
    this.props.loadData()
  }
  render () {
    let { data } = this.props
    return (
      <InitPage refresh={this._init} {...this.props}>
        <SafeAreaView style={{flex: 1, backgroundColor: '#fff'}}>
          <KeyboardAwareScrollView
            style={styles.around}
            bounces={false}
          >
            <View>
              <Header data={data} />
            </View>
            <View style={{marginTop: px2dp(50)}}>
              <Body navigation={this.props.navigation} data={data} />
            </View>
          </KeyboardAwareScrollView>
          {
            [repayStatus.unConsumed, repayStatus.AlreadyRepaid].indexOf(data.repayStatus) > -1
              ? <TouchableHighlight
                onPress={e => this.refs.RepaymentCheckbox.show()}
                underlayColor={'rgba(225, 225, 225, 0.75)'}
              >
                <View style={styles.btnView}>
                  <Paragraph style={styles.btn}>立即还款</Paragraph>
                </View>
              </TouchableHighlight>
              : <TouchableHighlight
                onPress={e => this.refs.RepaymentCheckbox.show()}
                underlayColor={'rgba(225, 225, 225, 0.75)'}
              >
                <View style={styles.btnView}>
                  <Paragraph style={styles.btn}>立即还款</Paragraph>
                </View>
              </TouchableHighlight>
          }
          <RepaymentCheckbox
            data={[
              {
                id: '0',
                title: '最低还款',
                fee: data.lowest,
                hint: '如无法及时还足余额，可尝试最低还款额'
              },
              {
                id: '1',
                title: '还清本月',
                fee: data.shouldRepay,
                hint: ''
              },
              {
                id: '2',
                title: '部分还款',
                fee: '',
                hint: '可自定义还款金额'
              }
            ]}
            okCallback={e => {
              this.props.navigation.navigate('MainFee', {status: e.id})
            }}
            ref='RepaymentCheckbox'
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
    paddingTop: px2dp(15),
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  btnView: {
    height: px2dp(50),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.themeColor
  },
  btn: {
    fontSize: px2dp(17),
    color: '#fff',
    fontWeight: theme.mediumFont
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

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(MainBill))
