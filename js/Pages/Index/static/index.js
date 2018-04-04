import HomePage from './../../HomePage/container/HomePage'
import MainDrawCash from './../../DrawCash/container/MainDrawCash'
import Mine from './../../Mine/container/Mine'
import Mall from './../../Mall/container/Mall'
/* 首页TabBar配置信息 */
export const navi = [
  {
    order: 0,
    selectedImg: require('./../../../Assets/tabXHOn.png'),
    unSelectedImg: require('./../../../Assets/tabXHOff.png'),
    name: '享花',
    component: HomePage
  },
  {
    order: 1,
    selectedImg: require('./../../../Assets/tabSCOn.png'),
    unSelectedImg: require('./../../../Assets/tabSCOff.png'),
    name: '商城',
    component: Mall
  },
  {
    order: 2,
    selectedImg: require('./../../../Assets/tabZXYOn.png'),
    unSelectedImg: require('./../../../Assets/tabZXYOff.png'),
    name: '提现',
    component: MainDrawCash
  },
  {
    order: 3,
    selectedImg: require('./../../../Assets/tabWDOn.png'),
    unSelectedImg: require('./../../../Assets/tabWDOff.png'),
    name: '我的',
    component: Mine
  }
]
