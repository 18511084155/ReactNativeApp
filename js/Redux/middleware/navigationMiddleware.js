import { NavigationActions } from 'react-navigation'
import { Keyboard } from 'react-native'
import DeviceStorage from './../../Services/storage.service'
import {routeConfig} from './../../Navigation'

function getCurrentRouteName (navigationState) {
  if (!navigationState) {
    return null
  }
  const route = navigationState.routes[navigationState.index]
  if (route.routes) {
    return getCurrentRouteName(route)
  }
  return route.routeName
}

let time = new Date().getTime()

export default ({ getState }) => next => action => {
  if (action.type !== NavigationActions.NAVIGATE && action.type !== NavigationActions.BACK && action.type !== NavigationActions.RESET) {
    return next(action)
  }
  const currentScreen = getCurrentRouteName(getState().navigation)
  const result = next(action)
  const nextScreen = getCurrentRouteName(getState().navigation)
  let getTitle = (options) => {
    let noTitle = '无标题'
    if (options) {
      if (options.headerTitle) return options.headerTitle
      if (options.pageName) return options.pageName
      return noTitle
    } else {
      return noTitle
    }
  }
  global.currentScreen = nextScreen
  if (currentScreen !== nextScreen) {
    global.currentScreen = currentScreen
    Keyboard.dismiss()
    DeviceStorage.genItemBody({
      type: 'leavePage',
      page: currentScreen,
      offsetTime: new Date().getTime() + 1,
      extraInfo: {
        standingTime: new Date().getTime() - time,
        pageTitle: getTitle(routeConfig[currentScreen].navigationOptions)
      }
    })
    DeviceStorage.genItemBody({
      type: 'enterPage',
      page: nextScreen,
      offsetTime: new Date().getTime(),
      extraInfo: {
        pageTitle: getTitle(routeConfig[nextScreen].navigationOptions)
      }
    })
    time = new Date().getTime()
  }
  return result
}
