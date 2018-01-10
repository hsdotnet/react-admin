import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import order from '../modules/order/OrderReducer'

const reducers = combineReducers({
  order,
  routing: routerReducer
})

export default reducers