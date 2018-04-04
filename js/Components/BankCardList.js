/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {TouchableWithoutFeedback, View, StyleSheet, Image} from 'react-native'
import px2dp from '../Util/px2dp'
import theme from '../Constants/theme'
import {bankInfo} from '../Constants/static'
import { Paragraph } from '../Components/Text'
import { RadioButton } from '../Components'

export default class BankCardList extends React.Component {
  constructor () {
    super(...arguments)
    this._renderList = this._renderList.bind(this)
    this._renderListView = this._renderListView.bind(this)
  }
  static propTypes = {
    onChange: PropTypes.func,
    onBind: PropTypes.func,
    list: PropTypes.array,
    selected: PropTypes.object
  }
  _renderList (option, selected, onSelect, index) {
    let size = option.cardNo.length
    let isEnable = option.isEnable
    return (
      <View key={'cardItem_' + index} style={styles.item}>
        {
          React.createElement(
            isEnable ? TouchableWithoutFeedback : View,
            {
              style: isEnable ? null : styles.editUnable,
              onPress: e => this.props.onChange(option)
            },
            <View style={styles.baseStyle}>
              <View style={styles.titleStyle}>
                <Image style={styles.bankLogo} source={bankInfo[option.bankCode].icon} />
                <View style={styles.line} />
                <Paragraph style={styles.title}>{`${option.bankName}（${option.cardNo.substring(size - 4, size)}）`}</Paragraph>
                {isEnable ? null : <Paragraph style={styles.tint}>不支持此银行</Paragraph>}
              </View>
              {isEnable &&
                (
                  selected
                    ? <Image style={styles.checked} source={require('./../Assets/checkedRadio.png')} />
                    : <View style={styles.unchecked} />
                )
              }
            </View>
          )
        }
      </View>
    )
  }
  _renderListView (optionNodes) {
    return (
      <View style={styles.btnView}>
        {optionNodes}
        <TouchableWithoutFeedback
          onPress={this.props.onBind}
        >
          <View style={styles.addTitleView}>
            <Image style={styles.addLogo} source={require('./../Assets/addLogo.png')} />
            <View style={styles.logoTextView}>
              <Paragraph style={styles.logoText}>添加新的银行卡</Paragraph>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
  render () {
    let {list, selected} = this.props
    return (
      <View style={styles.around}>
        <RadioButton
          options={list}
          selectedOption={selected}
          renderOption={this._renderList}
          renderContainer={this._renderListView}
          testOptionEqual={(a, b) => a.id === b.id}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  around: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  btnView: {
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  item: {
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  baseStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: px2dp(60)
  },
  editUnable: {
    opacity: 0.5
  },
  titleStyle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  line: {
    width: px2dp(1),
    height: px2dp(10),
    backgroundColor: '#d8d8d8',
    marginLeft: px2dp(7)
  },
  title: {
    fontSize: px2dp(20),
    color: theme.textColor,
    marginLeft: px2dp(10)
  },
  tint: {
    fontSize: px2dp(14),
    color: theme.textColor
  },
  bankLogo: {
    width: px2dp(16),
    height: px2dp(16)
  },
  checked: {
    width: px2dp(18),
    height: px2dp(18)
  },
  unchecked: {
    width: px2dp(18),
    height: px2dp(18),
    borderRadius: px2dp(18),
    borderWidth: theme.borderWidth,
    borderColor: '#B5B5B5'
  },
  logoTextView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginLeft: px2dp(18)
  },
  logoText: {
    fontSize: px2dp(20),
    color: theme.textColor
  },
  addTitleView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: px2dp(60),
    borderTopWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  addLogo: {
    width: px2dp(16),
    height: px2dp(16)
  }
})

