import { applyMiddleware, combineReducers, createStore } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux'

import { createEpicMiddleware } from 'redux-observable'
import { ajax } from 'rxjs/observable/dom/ajax'
import { subscriptionHolder, reducersHolder, initState, epics } from './domain'

const epicMiddleware = createEpicMiddleware(epics, { dependencies: { ajax } })

const routerReduxMiddleware = routerMiddleware(browserHistory)

const loggerMiddleware = createLogger({
  level: 'info',
  collapsed: true
})

const createStoreWithMiddleware = applyMiddleware(
  epicMiddleware,
  thunkMiddleware,
  loggerMiddleware,
  routerReduxMiddleware,
)(createStore)

const rootReducer = combineReducers({
  ...reducersHolder,
  routing: routerReducer
})

const store = createStoreWithMiddleware(rootReducer, initState)

const history = syncHistoryWithStore(browserHistory, store)

const unListeners = []
subscriptionHolder.forEach(({ subscriptions, actions }) => {
  for (const method in subscriptions) {
    if ({}.hasOwnProperty.call(subscriptions, method)) {
      unListeners.push(subscriptions[method]({ ...store, history }, actions))
    }
  }
})

export default { store, history }
