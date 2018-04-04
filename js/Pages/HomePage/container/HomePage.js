/**
 * Created by Joe on 2017/10/12.
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
  StyleSheet,
  Image,
  View,
  Keyboard,
  TouchableHighlight,
  StatusBar,
  RefreshControl,
  DeviceInfo,
  Platform
} from 'react-native'
import px2dp from './../../../Util/px2dp'
import theme from './../../../Constants/theme'
import {NativeNavigation} from './../../../Native/NativeRouter'
import {options, userStatus, native, nativeEmitKey} from './../../../Constants/static'

import {WithConnection} from './../../../Components/enhanced'
import {Paragraph} from './../../../Components/Text'
import {ListSimple, InitPage, Toast} from './../../../Components'
import {NotActive, Audit, Unconsumed, AlreadyConsumed, Header} from './../components/HomPage'
import { alreadyConsumed } from './../static'

import { connect } from 'react-redux'
import {loadData, loadList, active, initStatus} from '../../../Redux/actions/homePage/homePage'

const __TOP__ = Platform.OS === 'android' ? 0 : (DeviceInfo.isIPhoneX_deprecated ? 44 : 20)
const __BOTTOM__ = DeviceInfo.isIPhoneX_deprecated ? 34 : 0

const mapStateToProps = state => ({
  loading: state.homePage.get('loading'),
  loadingSuccess: state.homePage.get('loadingSuccess'),
  refreshing: state.homePage.get('refreshing'),
  msg: state.homePage.get('msg'),
  data: state.homePage.get('data').toJS(),
  list: state.homePage.get('list').toJS()
})
const mapDispatchToProps = {loadData, loadList, active, initStatus}
class HomePage extends React.Component {
  constructor () {
    super(...arguments)
    this._init = this._init.bind(this)
    this._initCard = this._initCard.bind(this)
    this._initList = this._initList.bind(this)
    this._goLogin = this._goLogin.bind(this)
    this._renderItems = this._renderItems.bind(this)
    this._renderSection = this._renderSection.bind(this)
    this._active = this._active.bind(this)
    this.allowShow = true
  }
  static propTypes = {
    navigation: PropTypes.object,
    data: PropTypes.object,
    refreshing: PropTypes.bool,
    list: PropTypes.array,
    loadData: PropTypes.func,
    initStatus: PropTypes.func,
    active: PropTypes.func,
    msg: PropTypes.oneOfType([ PropTypes.number, PropTypes.string ]),
    loadList: PropTypes.func
  }
  componentWillReceiveProps (np) {
    if (np.msg && this.allowShow && np.msg !== this.props.msg) {
      this.allowShow = false
      this.refs.__toast__.show(
        np.msg,
        2000,
        () => {
          this.allowShow = true
        }
      )
    }
  }
  componentWillMount () {
    if (Platform.OS === 'ios') {
      this.refresh && this.refresh.remove()
      this.refresh = NativeNavigation.eventEmit
        .addListener(nativeEmitKey.refreshHOMEPAGE, Authorization => {
          global._user_.Authorization = Authorization
          global._isLogin_ = !global.util.isNull(Authorization)
          this._init()
        })
    }
    this._init()
  }
  componentWillUnmount () {
    this.refresh && this.refresh.remove()
    Keyboard.dismiss()
  }
  _init () {
    if (global._status_ !== native.INIT) {
      this._initList()
      if (global._isLogin_) {
        this._initCard()
      } else {
        this.props.initStatus({status: userStatus.default})
      }
    }
  }
  _initCard () {
    let {loadData} = this.props
    loadData({merchantCode: options.merchantCode})
  }
  _initList () {
    let {loadList} = this.props
    loadList()
  }
  _renderItems (v) {
    return (
      <View style={styles.itemView}>
        <View style={styles.itemLogoTitle}>
          <Image style={styles.itemLogo} source={{uri: v.image}} />
          <View style={styles.itemTitleView}>
            <Paragraph numberOfLines={1} style={styles.itemTitle}>
              {v.title}
            </Paragraph>
            <Paragraph numberOfLines={1} style={styles.itemHint}>
              {v.subtitle}
            </Paragraph>
          </View>
        </View>
        {
          React.createElement(
            v.url ? TouchableHighlight : View,
            {
              style: styles.touch,
              underlayColor: 'rgba(225, 225, 225, 0.75)',
              onPress: e => NativeNavigation.openWeb(v.url)
            },
            <View>
              <Paragraph style={[styles.touchWord, {color: v.url ? theme.themeColor : theme.displayColor}]}>
                {v.button}
              </Paragraph>
            </View>
          )
        }
      </View>
    )
  }
  _renderSection () {
    let { data } = this.props
    // data.status = userStatus.success
    // data.repayStatus = alreadyConsumed.lowRepayment
    // data.hasOrder = true
    switch (data.status) {
      case userStatus.fail : {
        return <Audit data={data} />
      }
      case userStatus.default : {
        return <NotActive active={this._active} />
      }
      case userStatus.doing : {
        return <Audit data={data} />
      }
      case userStatus.missPassword : {
        return <Audit data={data} setPassWord={() => this._goLogin() && NativeNavigation.openPayPassWordAction()} />
      }
      case userStatus.success : {
        if (!data.hasOrder) {
          return <Unconsumed data={data} goMall={() => NativeNavigation.goMall()} />
        } else {
          return <AlreadyConsumed data={data} goRepayment={() => this._goLogin() && NativeNavigation.showPayDialog()} />
        }
      }
      default : { return <NotActive active={this._active} /> }
    }
  }
  _goLogin () {
    if (!global._isLogin_) {
      NativeNavigation.loginNativeFromCallback((Authorization, phoneNo) => {
        global._user_.Authorization = Authorization
        global._user_.phoneNo = phoneNo
        global._isLogin_ = !global.util.isNull(Authorization)
        this._init()
      })
      return false
    }
    return true
  }
  _active () {
    if (this._goLogin()) {
      let {active} = this.props
      active({merchantCode: options.merchantCode}, () => {
        let { _params_ = {} } = global
        _params_.isActive = true
        global._params_ = _params_
        this._init()
      })
    }
  }
  render () {
    let {refreshing, list} = this.props
    return (
      <InitPage refresh={this._init} {...this.props}>
        <View style={styles.view}>
          <StatusBar barStyle='dark-content' />
          <ListSimple
            style={styles.scroll}
            contentContainerStyle={{paddingBottom: px2dp(50)}}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={this._init}
                tintColor='gray'
              />
            }
            dataSource={{a: list}}
            renderSectionHeader={
              e =>
                <View>
                  {this._renderSection()}
                  <Header />
                </View>}
            renderRow={this._renderItems}
          />
          <Toast top={__TOP__} ref='__toast__' />
        </View>
      </InitPage>
    )
  }
}

const styles = StyleSheet.create({
  view: {
    backgroundColor: '#fff',
    paddingTop: __TOP__,
    paddingBottom: __BOTTOM__,
    flex: 1
  },
  scroll: {
    flex: 1
  },
  itemView: {
    height: px2dp(50),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: px2dp(20),
    paddingRight: px2dp(20),
    marginBottom: px2dp(28)
  },
  itemLogoTitle: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  itemLogo: {
    width: px2dp(50),
    height: px2dp(50)
  },
  itemTitleView: {
    marginLeft: px2dp(37),
    width: px2dp(165)
  },
  itemTitle: {
    fontSize: px2dp(15),
    color: theme.textColor,
    fontWeight: theme.regularFont
  },
  itemHint: {
    fontSize: px2dp(12),
    marginTop: px2dp(10),
    color: theme.displayColor
  },
  touch: {
    width: px2dp(70),
    height: px2dp(35),
    borderRadius: 5,
    borderWidth: theme.borderWidth,
    borderColor: theme.borderColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  touchWord: {
    fontSize: px2dp(13),
    fontWeight: theme.regularFont
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(WithConnection(HomePage))
