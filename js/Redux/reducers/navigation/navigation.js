import { Main } from './../../../Navigation'
import { NavigationActions } from 'react-navigation'
const initialState = Main.router.getStateForAction(NavigationActions.init())
export const navigation = (state = initialState, action) => {
  switch (action.type) {
    case 'Navigation/INIT':
      const routes = [{
        key: `Init-id-${Date.now()}-0`,
        routeName: action.routeName
      }]
      return {
        routes,
        index: 0
      }
    case 'Navigation/REPLACE': {
      const routes = state.routes.slice(0, state.routes.length - 1)
      action.key = `id-${Date.now()}-${routes.length - 1}`
      routes.push(action)
      return {
        ...state,
        routes,
        index: routes.length - 1
      }
    }
    case 'Navigation/REFRESH': {
      let size = state.routes.length
      let route = state.routes[size - 1]
      let routes = []
      if (size > 1) {
        routes = state.routes.slice(0, size - 1)
        route.key = `id-${Date.now()}-${routes.length - 1}`
      } else {
        route.key = `Init-id-${Date.now()}-0`
      }
      routes.push(route)
      return {
        ...state,
        routes,
        index: size - 1
      }
    }
    default:
      const nextState = Main.router.getStateForAction(action, state)
      return nextState || state
  }
}
