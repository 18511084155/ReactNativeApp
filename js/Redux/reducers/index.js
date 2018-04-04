import { combineReducers } from 'redux'
import {navigation} from './navigation/navigation.js'
import mainFee from './repayment/mainFee.js'
import payCenterCard from './payCenter/payCenterCard.js'
import payPassWord from './payCenter/payPassWord.js'
import addNewCard from './addNewCard/addNewCard.js'
import mainDrawCash from './drawCash/mainDrawCash.js'
import drawCashCenter from './drawCash/drawCashCenter.js'
import mainBill from './bill/mainBill.js'
import monthBill from './bill/monthBill.js'
import noAccountBill from './bill/noAccountBill.js'
import historyBill from './bill/historyBill.js'
import homePage from './homePage/homePage.js'
import mine from './mine/mine.js'
import index from './index/index.js'

export default combineReducers({
  navigation,
  index,
  homePage,
  mine,
  mainFee,
  payCenterCard,
  payPassWord,
  addNewCard,
  mainDrawCash,
  drawCashCenter,
  mainBill,
  monthBill,
  noAccountBill,
  historyBill
})
