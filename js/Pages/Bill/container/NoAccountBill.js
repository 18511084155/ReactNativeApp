/**
 * Created by Joe on 2018/1/3.
 */
import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, SafeAreaView } from 'react-native'
import {ListSimple, TouchLabel, InitPage, NoData} from './../../../Components'
import px2dp from '../../../Util/px2dp'
import theme from '../../../Constants/theme'

import { connect } from 'react-redux'
import { loadData } from './../../../Redux/actions/bill/noAccountBill'
import { Paragraph } from '../../../Components/Text'
import { toastMessage } from '../../../Components/enhanced'

const mapStateToProps = state => ({
  loading: state.noAccountBill.get('loading'),
  loadingSuccess: state.noAccountBill.get('loadingSuccess'),
  msg: state.noAccountBill.get('msg'),
  list: state.noAccountBill.get('list').toJS()
})

const mapDispatchToProps = ({loadData})

class NoAccountBill extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._renderRow = this._renderRow.bind(this)
    this._renderSectionHeader = this._renderSectionHeader.bind(this)
  }
  static propTypes = {
    list: PropTypes.oneOfType([ PropTypes.object, PropTypes.array ]),
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
    return (
      <TouchLabel
        titleTag={(
          rowData.loaned ? <View style={styles.tagView}>
            <Paragraph style={styles.tag}>入账中</Paragraph>
          </View> : null
        )}
        title={rowData.name}
        titleStyle={styles.titleStyle}
        hint={rowData.date}
        hintStyle={styles.hintStyle}
        status={'￥' + rowData.amount}
        statusStyle={styles.statusStyle}
        hasTopLine={false}
        editable={false}
        height={px2dp(60)}
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
    width: px2dp(40),
    height: px2dp(20),
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: theme.borderWidth,
    borderColor: theme.themeColor,
    marginRight: px2dp(6)
  },
  tag: {
    fontSize: px2dp(11),
    color: theme.themeColor,
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
    color: theme.textColor,
    fontWeight: theme.lightFont
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(NoAccountBill))
