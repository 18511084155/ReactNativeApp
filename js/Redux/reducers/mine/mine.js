import {types} from './../../../Constants/actionTypes'
import { fromJS } from 'immutable'

const initialState = {
  loading: false,
  msg: '',
  data: {},
  list: []
}

export default function reducer (state = fromJS(initialState), action) {
  switch (action.type) {
    case types.MINE_LOAD_DATA_LOADING:
      return state.set('loading', true)
        .set('msg', '')
    case types.MINE_LOAD_DATA_LOADING_SUCCESS:
      return state.set('loading', false)
        .set('data', fromJS(action.data))
        .set('list', fromJS([
          {
            img: require('./../../../Assets/money.png'),
            title: '商城购物返现',
            hint: '返现比例2%每单必返',
            btnName: '前往购物',
            editable: true
          },
          {
            img: require('./../../../Assets/wallet.png'),
            title: '快捷提现',
            hint: '30秒完成提现操作',
            btnName: '立即提现',
            editable: true
          },
          {
            img: require('./../../../Assets/unionPay.png'),
            title: '银联云闪付',
            hint: '线下门店一挥即付',
            btnName: '敬请期待',
            editable: false
          }
        ]))
        .set('msg', '')
    case types.MINE_LOAD_DATA_LOADING_FAILED:
      return state.set('loading', false)
        .set('msg', action.msg)
    default:
      return state
  }
}
