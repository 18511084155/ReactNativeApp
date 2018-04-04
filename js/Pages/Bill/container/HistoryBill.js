/**
 * Created by Joe on 2018/1/3.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import { ListSimple, TouchLabel, InitPage, NoData } from './../../../Components'
import px2dp from '../../../Util/px2dp'
import theme from '../../../Constants/theme'
import { toastMessage } from '../../../Components/enhanced'

import { connect } from 'react-redux'
import { loadData } from './../../../Redux/actions/bill/historyBill'
import { Paragraph } from '../../../Components/Text'

const mapStateToProps = state => ({
  loading: state.historyBill.get('loading'),
  loadingSuccess: state.historyBill.get('loadingSuccess'),
  msg: state.historyBill.get('msg'),
  list: state.historyBill.get('list').toJS()
})

const mapDispatchToProps = ({loadData})

class HistoryBill extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._renderRow = this._renderRow.bind(this)
    this._renderSectionHeader = this._renderSectionHeader.bind(this)
  }

  static propTypes = {
    list: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
    navigation: PropTypes.object,
    loading: PropTypes.bool,
    loadData: PropTypes.func
  }

  componentWillMount () {
    this._init()
  }

  _init () {
    this.props.loadData()
  }

  _renderRow (rowData) {
    let {navigation: {navigate}} = this.props
    return (
      <TouchLabel
        title={rowData.title}
        titleStyle={styles.titleStyle}
        hint={rowData.billCycle}
        hintStyle={styles.hintStyle}
        statusTag={(
          <View style={styles.tagView}>
            <Paragraph style={styles.tagFee}>{'￥' + rowData.amount}</Paragraph>
            {rowData.status === 4 ? <Paragraph style={styles.tagHint}>已逾期</Paragraph> : null}
          </View>
        )}
        hasTopLine={false}
        height={px2dp(80)}
        onPress={e => navigate('MonthBill', {billId: rowData.billId})}
      />
    )
  }

  _renderSectionHeader (data, sectionID) {
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
    let { list } = this.props
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
    paddingRight: px2dp(20),
    marginBottom: px2dp(30)
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
  titleStyle: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.lightFont
  },
  tagView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginRight: px2dp(23)
  },
  tagFee: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.lightFont
  },
  tagHint: {
    fontSize: px2dp(12),
    color: '#FF0000',
    fontWeight: theme.lightFont
  },
  hintStyle: {
    fontSize: px2dp(12),
    color: theme.textLightColor,
    fontWeight: theme.lightFont
  },
  sectionTextStyle: {
    fontSize: px2dp(14),
    color: theme.themeColor,
    fontWeight: theme.lightFont
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(HistoryBill))
