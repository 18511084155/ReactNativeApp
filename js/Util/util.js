import {back, backHomeRoutes} from './../Constants/static'
import {NativeNavigation} from './../Native/NativeRouter'
import { NavigationActions } from 'react-navigation'

export function rootAction (routeName, params) {
  return NavigationActions.reset({
    index: 0,
    actions: [ NavigationActions.navigate({ routeName, params }) ]
  })
}

export function getBackStatus () {
  let routes = global.store.getState().navigation.routes
  let size = routes.length
  // 判断返回原生首页
  if (backHomeRoutes.indexOf(routes[size - 1].routeName) > -1) {
    return back.home
  } else if (size > 1) { // 判断返回上一页
    return back.back
  } else {
    if (routes[0].routeName === 'HomePage') { // 判断退出
      return back.exit
    } else { // 判断调用原生返回
      return back.native
    }
  }
}

export function back2Top () {
  let routes = getBackStatus()
  if (routes === back.back) { // 判断返回上一页
    global.store.dispatch(NavigationActions.back({key: null}))
  } else if (routes === back.native) { // 判断调用原生返回
    NativeNavigation.back()
  }
}
