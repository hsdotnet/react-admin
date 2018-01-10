import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import order from './order'

const index = combineReducers({
  order,
  routing: routerReducer
})

export default index