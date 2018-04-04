import React from 'react'
import PropTypes from 'prop-types'
import { View, StyleSheet, DeviceInfo } from 'react-native'
import TabBar from './componnets/TabBar'
import { navi } from './static'
import theme from '../../Constants/theme'
import {toastMessage} from '../../Components/enhanced'
import px2dp from '../../Util/px2dp'

import { connect } from 'react-redux'

const mapStateToProps = state => ({
  msg: state.index.get('msg')
})

const __BOTTOM__ = DeviceInfo.isIPhoneX_deprecated ? 34 : 0

class IndexPage extends React.Component {
  constructor () {
    super(...arguments)
    this._renderPage = this._renderPage.bind(this)
    this._navigate = this._navigate.bind(this)
  }
  static propTypes = {
    navigation: PropTypes.object
  }
  _navigate (order) {
    this.props.navigation.setParams({order})
  }
  _renderPage () {
    let { navigation } = this.props
    let { params } = navigation.state
    let order = params && !global.util.isNull(params.order) ? params.order : navi[0].order
    for (let item of navi) {
      if (order === item.order) {
        return React.createElement(item.component, {navigation})
      }
    }
  }
  render () {
    let { params } = this.props.navigation.state
    let order = params && !global.util.isNull(params.order) ? params.order : navi[0].order
    return (
      <View style={styles.container}>
        <View style={styles.round}>
          {this._renderPage()}
        </View>
        <TabBar order={order} goPage={this._navigate} />
      </View>
    )
  }
}

const navigationOptions = ({ navigation }) => {
  let { params } = navigation.state
  let order = params && !global.util.isNull(params.order) ? params.order : navi[0].order
  switch (order) {
    // case 1:
    //   return {
    //     headerTintColor: '#FFFFFF',
    //     headerTitle: (<View style={styles.headerContainer}>
    //       <View />
    //     </View>)
    //   }
    case 2:
      return {
        headerTitle: '提现',
        headerTitleStyle: {alignSelf: 'center'},
        headerRight: <View />,
        headerLeft: <View />
        // header: null
      }
    default:
      return {
        header: null
      }
  }
}
// headerLeft: <View>
//   <TouchableOpacity style={styles.backView}>
//     <Image style={styles.backImg} source={require('./../../Assets/back.png')} />
//   </TouchableOpacity>
// </View>

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#fff',
    paddingBottom: __BOTTOM__
  },
  headerContainer: {
    backgroundColor: 'red',
    width: theme.screenWidth,
    flex: 1
  },
  round: {
    flex: 1
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
export default connect(mapStateToProps)(toastMessage(IndexPage, navigationOptions))
