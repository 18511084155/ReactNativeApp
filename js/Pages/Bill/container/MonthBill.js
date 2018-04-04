/**
 * Created by Joe on 2018/1/3.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, TouchableHighlight, Image, SafeAreaView } from 'react-native'
import {ListSimple, TouchLabel, RepaymentCheckbox, InitPage, NoData} from './../../../Components'
import px2dp from '../../../Util/px2dp'
import theme from '../../../Constants/theme'
import { alreadyConsumed } from '../../HomePage/static'
import { Paragraph } from '../../../Components/Text'
import { toastMessage } from '../../../Components/enhanced'

import { connect } from 'react-redux'
import { loadData } from './../../../Redux/actions/bill/monthBill'

const mapStateToProps = state => ({
  loading: state.monthBill.get('loading'),
  loadingSuccess: state.monthBill.get('loadingSuccess'),
  msg: state.monthBill.get('msg'),
  title: state.monthBill.get('title'),
  data: state.monthBill.get('data').toJS(),
  list: state.monthBill.get('list').toJS()
})

const mapDispatchToProps = ({loadData})

class MonthBill extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._renderRow = this._renderRow.bind(this)
    this._renderSectionHeader = this._renderSectionHeader.bind(this)
  }
  static propTypes = {
    loading: PropTypes.bool,
    navigation: PropTypes.object,
    data: PropTypes.object,
    list: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
    loadData: PropTypes.func
  }
  componentWillMount () {
    this._init()
  }
  componentWillReceiveProps (np) {
    if (this.title !== np.title) {
      this.title = np.title
      let { navigation } = this.props
      navigation.setParams({ headerTitle: np.title })
    }
  }
  _init () {
    let { navigation, loadData } = this.props
    let { params = {} } = navigation.state
    let billId = params.billId || ''
    loadData({ billId })
  }
  _renderRow (rowData) {
    return (
      <View style={{marginBottom: rowData.isLast ? px2dp(30) : 0}}>
        <TouchLabel
          title={rowData.name}
          titleStyle={styles.titleStyle}
          hint={rowData.date || ''}
          hintStyle={styles.hintStyle}
          status={'￥' + rowData.amount}
          statusStyle={styles.statusStyle}
          hasTopLine={false}
          editable={false}
          height={px2dp(60)}
        />
      </View>
    )
  }
  _renderSectionHeader (data, sectionID) {
    if (data && data.length > 0) {
      data[data.length - 1].isLast = true
    }
    return (
      <TouchLabel
        title={sectionID}
        titleStyle={styles.sectionTextStyle}
        hasTopLine={false}
        editable={false}
        height={px2dp(50)}
      />
    )
  }
  render () {
    let { list, data } = this.props
    return (
      <InitPage refresh={this._init} {...this.props}>
        {
          !global.util.isEmptyObject(list)
          ? <SafeAreaView style={styles.around}>
            <ListSimple
              style={styles.listView}
              dataSource={list}
              renderRow={this._renderRow}
              renderSectionHeader={this._renderSectionHeader}
            />
            {
              global.util.isEmptyObject(data) || data.repayStatus === alreadyConsumed.repayment
              ? null
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
                  fee: data.lowest || '',
                  hint: '如无法及时还足余额，可尝试最低还款额'
                },
                {
                  id: '1',
                  title: '还清本月',
                  fee: data.shouldRepay || '',
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
          : <NoData title={'暂时没有账单哦'} />
        }
      </InitPage>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    backgroundColor: '#fff'
  },
  listView: {
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  titleStyle: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.lightFont
  },
  hintStyle: {
    fontSize: px2dp(12),
    color: theme.textLightColor,
    fontWeight: theme.lightFont
  },
  statusStyle: {
    color: theme.textColor,
    fontWeight: theme.lightFont,
    marginRight: 0
  },
  sectionTextStyle: {
    fontSize: px2dp(14),
    color: theme.themeColor,
    fontWeight: theme.lightFont
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
  }
})

const navigationOptions = ({navigation}) => {
  return ({
    headerTitle: navigation.state.params ? navigation.state.params.headerTitle : '',
    headerTitleStyle: {alignSelf: 'center'},
    headerRight: <View />,
    headerLeft: <TouchableHighlight
      underlayColor={'rgba(225, 225, 225, 0.75)'}
      onPress={e => navigation.goBack()}
      style={{flexDirection: 'row'}}
    >
      <View
        style={{
          flex: 1,
          padding: px2dp(13),
          paddingLeft: px2dp(15),
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Image
          style={{width: px2dp(20), height: px2dp(20)}}
          source={require('./../../../Assets/back.png')} />
      </View>
    </TouchableHighlight>
  })
}

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(MonthBill, navigationOptions))
