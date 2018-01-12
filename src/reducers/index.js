import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import order from '../modules/order/OrderReducer'
import common from '../modules/common/CommonReducer'

const reducers = combineReducers({
  common,
  order,
  routing: routerReducer
})

export default reducers