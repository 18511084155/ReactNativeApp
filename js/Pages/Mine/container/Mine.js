/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  ScrollView,
  View,
  Keyboard,
  Image,
  DeviceInfo,
  StatusBar,
  Platform
} from 'react-native'
import theme from './../../../Constants/theme'

import {toastMessage} from './../../../Components/enhanced'
import {Header, Bill, Mall, Options} from './../componnets/Mine'

import { connect } from 'react-redux'
import {loadData} from '../../../Redux/actions/mine/mine'

const __TOP__ = Platform.OS === 'android' ? 0 : (DeviceInfo.isIPhoneX_deprecated ? 44 : 20)

const mapStateToProps = state => ({
  loading: state.mine.get('loading'),
  msg: state.mine.get('msg'),
  data: state.mine.get('data').toJS(),
  list: state.mine.get('list').toJS()
})
const mapDispatchToProps = {loadData}
class Mine extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this.isLogin = true
  }
  static propTypes = {
    loadData: PropTypes.func
  }
  componentWillMount () {
    this._init()
  }
  componentWillUnmount () {
    Keyboard.dismiss()
  }
  _init () {
    let {loadData} = this.props
    loadData('123', list => {
    })
  }
  render () {
    return (
      <View style={styles.view}>
        <StatusBar barStyle='light-content' />
        <ScrollView style={styles.scroll} bounces={false}>
          <Image style={styles.barImg} source={require('./../../../Assets/minHeader.png')} />
          <Header isLogin={this.isLogin} />
          <Bill isLogin={this.isLogin} />
          <Mall isLogin={this.isLogin} />
          <Options isLogin={this.isLogin} />
        </ScrollView>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    backgroundColor: theme.bgColor
  },
  barImg: {
    width: theme.screenWidth,
    height: __TOP__
  },
  scroll: {
    flex: 1
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(toastMessage(Mine))
