import {StackNavigator} from 'react-navigation'
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator'
import React from 'react'
import { View, TouchableHighlight, Image, Platform } from 'react-native'
import px2dp from '../Util/px2dp'
import { back2Top } from './../Util/util'
import MainBill from '../Pages/Bill/container/MainBill'
import MonthBill from '../Pages/Bill/container/MonthBill'
import NoAccountBill from '../Pages/Bill/container/NoAccountBill'
import HistoryBill from '../Pages/Bill/container/HistoryBill'
import MainDrawCash from '../Pages/DrawCash/container/MainDrawCash'
import MainFee from '../Pages/Repayment/container/MainFee'
import DrawCashCenter from '../Pages/DrawCash/container/DrawCashCenter'
import DrawCashSuccess from '../Pages/DrawCash/container/DrawCashSuccess'
import PayCenterCard from '../Pages/PayCenter/container/PayCenterCard'
import PayPassWord from '../Pages/PayCenter/container/PayPassWord'
import PaySuccess from '../Pages/PayCenter/container/PaySuccess'
import PayFailed from '../Pages/PayCenter/container/PayFailed'
import AddNewCard from '../Pages/AddNewCard/container/AddNewCard'
import IndexPage from '../Pages/Index'
import HomePage from '../Pages/HomePage/container/HomePage'
import Mine from '../Pages/Mine/container/Mine'
import theme from '../Constants/theme'
import CommonWebView from '../Components/page/CommonWebView'

const headerLeft = navi => (
  <TouchableHighlight
    underlayColor={'rgba(225, 225, 225, 0.75)'}
    onPress={navi.onPress}
  >
    <View style={{
      flex: 1,
      padding: px2dp(13),
      paddingLeft: px2dp(15),
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image style={{
        width: px2dp(20),
        height: px2dp(20)
      }} source={require('./../Assets/back.png')} />
    </View>
  </TouchableHighlight>
)
const backToTop = () => (
  <TouchableHighlight
    underlayColor={'rgba(225, 225, 225, 0.75)'}
    onPress={back2Top}
  >
    <View style={{
      flex: 1,
      padding: px2dp(13),
      paddingLeft: px2dp(15),
      justifyContent: 'center',
      alignItems: 'center'
    }}>
      <Image style={{
        width: px2dp(20),
        height: px2dp(20)
      }} source={require('./../Assets/back.png')} />
    </View>
  </TouchableHighlight>
)
const headerRight = <View />
const headerTitleStyle = {alignSelf: 'center'}
const options = {
  headerLeft,
  headerRight,
  headerTitleStyle
}

/**
 * 1、如果没有固定的herderTitle需设置pageName属性，标记页面用途
 * 如：
 * MonthBill: {
 *  screen: MonthBill,
 *   navigationOptions: {
 *    pageName: '月账单'
 *  }
 * }
 * 2、如果没有header也需要添加headerTitle,标记页面用途
 * 如：
 * HomePage: {
 *  screen: HomePage,
 *  navigationOptions: {
 *    header: null,
 *    headerTitle: '首页'
 *  }
 * }
 */
export const routeConfig = {
  HomePage: {
    screen: HomePage,
    navigationOptions: {
      header: null,
      headerTitle: '首页'
    }
  },
  IndexPage: {
    screen: IndexPage
  },
  Mine: {
    screen: Mine,
    navigationOptions: {
      header: null,
      headerTitle: '我的'
    }
  },
  MainBill: {
    screen: MainBill,
    navigationOptions: {
      headerTitle: '白条还款',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: <View />,
      headerLeft: backToTop()
    }
  },
  MonthBill: {
    screen: MonthBill,
    navigationOptions: {
      pageName: '月账单'
    }
  },
  NoAccountBill: {
    screen: NoAccountBill,
    navigationOptions: {
      headerTitle: '账单查询',
      ...options
    }
  },
  HistoryBill: {
    screen: HistoryBill,
    navigationOptions: {
      headerTitle: '历史账单',
      ...options
    }
  },
  MainDrawCash: {
    screen: MainDrawCash,
    navigationOptions: {
      headerTitle: '提现',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: <View />,
      headerLeft: backToTop()
    }
  },
  DrawCashCenter: {
    screen: DrawCashCenter,
    navigationOptions: {
      headerTitle: '提现中心',
      ...options
    }
  },
  DrawCashSuccess: {
    screen: DrawCashSuccess,
    navigationOptions: {
      headerTitle: '提交成功',
      headerLeft: <View />,
      headerRight,
      headerTitleStyle
    }
  },
  MainFee: {
    screen: MainFee,
    navigationOptions: {
      headerTitle: '还款',
      headerTitleStyle: {alignSelf: 'center'},
      headerRight: <View />,
      headerLeft: backToTop()
    }
  },
  PayCenterCard: {
    screen: PayCenterCard,
    navigationOptions: {
      headerTitle: '支付中心',
      ...options
    }
  },
  PayPassWord: {
    screen: PayPassWord,
    navigationOptions: {
      headerTitle: '支付密码',
      ...options
    }
  },
  PaySuccess: {
    screen: PaySuccess,
    navigationOptions: {
      headerTitle: '支付成功',
      headerLeft: <View />,
      headerRight,
      headerTitleStyle
    }
  },
  PayFailed: {
    screen: PayFailed,
    navigationOptions: {
      headerTitle: '支付失败',
      ...options
    }
  },
  AddNewCard: {
    screen: AddNewCard,
    navigationOptions: {
      headerTitle: '绑定银行卡',
      ...options
    }
  },
  CommonWebView: {
    screen: CommonWebView,
    navigationOptions: {
      pageName: '打开网页链接'
    }
  }
}

// const zoom = (index, position) => {
//   const inputRange = [index - 1, index, index + 1]
//   const outputRange = [0.9, 1, 1]
//   const scaleX = position.interpolate({
//     inputRange,
//     outputRange
//   })
//   const scaleY = position.interpolate({
//     inputRange,
//     outputRange
//   })
//   return {
//     transform: [
//       { scaleX },
//       { scaleY }
//     ]
//   }
// }

const stackConfiguration = {
  initialRouteName: 'MainBill',
  headerMode: 'screen',
  transitionConfig: () => {
    return {
      // transitionSpec: {
      //   duration: 200,
      //   easing: Easing.linear(),
      //   timing: Animated.timing
      // },
      screenInterpolator: (sceneProps) => {
        // const { scene: {index, route}, position } = sceneProps
        const { scene: {route} } = sceneProps
        if (Platform.OS === 'ios') {
          const params = route.params || {}
          const transition = params.transition || 'forHorizontal'
          return CardStackStyleInterpolator[transition](sceneProps)
        } else {
          // return zoom(index, position)
          return CardStackStyleInterpolator.forFade(sceneProps)
        }
      }
    }
  },
  navigationOptions: {
    headerBackTitle: null,
    headerTintColor: theme.textColor,
    headerStyle: {backgroundColor: '#fff'}
  }
}

export const Main = StackNavigator(routeConfig, stackConfiguration)
