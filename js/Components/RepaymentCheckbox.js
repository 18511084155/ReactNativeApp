import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { StyleSheet, View, TouchableHighlight, TouchableWithoutFeedback, Image, ScrollView } from 'react-native'
import theme from '../Constants/theme'
import {Paragraph} from '../Components/Text'
import {RadioButton} from '../Components'
import Mask from './base/Mask'
import px2dp from '../Util/px2dp'

/**
 * 弹框
 data: 数据
 okCallback: PropTypes.func, 点击确定回调
 cancelCallback: PropTypes.func 点击取消回调
 */
function getSelected (data) {
  let obj = {}
  for (let z of data) {
    obj[z.id] = z
  }
  if (obj['0'].fee) {
    return obj['0']
  }
  if (obj['1'].fee) {
    return obj['1']
  }
  return obj['2']
}

export default class RepaymentCheckbox extends Component {
  constructor () {
    super(...arguments)
    this.show = this.show.bind(this)
    this.hide = this.hide.bind(this)
    this._renderList = this._renderList.bind(this)
    this._renderListView = this._renderListView.bind(this)
    this.okCallback = this.okCallback.bind(this)
    this.cancelCallback = this.cancelCallback.bind(this)
    this.state = {
      selected: getSelected(this.props.data)
    }
  }
  static propTypes = {
    data: PropTypes.array,
    okCallback: PropTypes.func,
    cancelCallback: PropTypes.func
  }
  show () {
    this.refs.background.show()
  }
  hide () {
    this.refs.background.hide()
  }
  okCallback () {
    let { okCallback = () => null } = this.props
    okCallback(this.state.selected)
    this.hide()
  }
  cancelCallback () {
    let { cancelCallback = () => null } = this.props
    cancelCallback()
    this.hide()
  }
  _renderList (option, selected, onSelect, index) {
    return (
      React.createElement(
        option.fee && Number(option.fee || 0) === 0 ? View : TouchableWithoutFeedback,
        {
          key: 'item_' + index,
          onPress: e => this.setState({selected: option}),
          style: styles.itemViewborder
        },
        <View style={[styles.itemView, {opacity: option.fee && Number(option.fee || 0) === 0 ? 0.5 : 1}]}>
          <View>
            {
              selected
                ? <Image style={styles.checked} source={require('./../Assets/checkedRadio.png')} />
                : <View style={styles.unchecked} />
            }
          </View>
          <View style={styles.infoView}>
            <Paragraph style={styles.fee}>{option.title}{option.fee ? `（${option.fee}）` : ''}</Paragraph>
            {option.hint ? <Paragraph style={styles.hint}>{option.hint}</Paragraph> : null}
          </View>
        </View>
      )
    )
  }
  _renderListView (optionNodes) {
    return (
      <ScrollView style={styles.listView} bounces={false}>
        {optionNodes}
      </ScrollView>
    )
  }
  render () {
    return (
      <Mask ref='background'>
        <View style={styles.alertView}>
          <View style={styles.headerView}>
            <TouchableWithoutFeedback
              onPress={this.hide}>
              <View style={styles.headerTouch}>
                <Paragraph style={styles.cancel}>取消</Paragraph>
              </View>
            </TouchableWithoutFeedback>
          </View>
          <RadioButton
            options={this.props.data}
            selectedOption={this.state.selected}
            renderOption={this._renderList}
            renderContainer={this._renderListView}
            testOptionEqual={(a, b) => a.id === b.id}
          />
          {
            React.createElement(
              global.util.isEmptyObject(this.state.selected) ? View : TouchableHighlight,
              {
                style: [styles.btns, {opacity: global.util.isEmptyObject(this.state.selected) ? 0.5 : 1}],
                underlayColor: 'rgba(225, 225, 225, 0.75)',
                onPress: this.okCallback
              },
              <View style={styles.btnView}>
                <Paragraph style={styles.btn}>下一步</Paragraph>
              </View>
            )
          }
        </View>
      </Mask>
    )
  }
}

const styles = StyleSheet.create({
  alertView: {
    position: 'absolute',
    width: theme.screenWidth,
    height: px2dp(307),
    flex: 1,
    backgroundColor: '#fff',
    left: 0,
    bottom: 0
  },
  headerView: {
    height: px2dp(55),
    marginRight: px2dp(20),
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    marginLeft: px2dp(20),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  headerTouch: {
    height: px2dp(55),
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  cancel: {
    fontSize: px2dp(14),
    color: theme.displayColor
  },
  btnView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.themeColor
  },
  btns: {
    width: theme.screenWidth,
    height: px2dp(50),
    position: 'absolute',
    left: 0,
    bottom: 0
  },
  btn: {
    fontSize: px2dp(17),
    color: '#fff',
    fontWeight: theme.mediumFont
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
  listView: {
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20)
  },
  itemViewborder: {
    borderBottomWidth: theme.borderWidth,
    borderColor: theme.borderColor
  },
  itemView: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    height: px2dp(60)
  },
  infoView: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginLeft: px2dp(10)
  },
  fee: {
    fontSize: px2dp(15),
    color: theme.textColor
  },
  hint: {
    fontSize: px2dp(12),
    color: theme.displayColor
  }
})
