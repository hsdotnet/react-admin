import {applyMiddleware, combineReducers, createStore} from 'redux'
import thunkMiddleware from 'redux-thunk'
import {browserHistory} from 'react-router'
import {createLogger} from 'redux-logger'
import {routerMiddleware, routerReducer, syncHistoryWithStore} from 'react-router-redux'

import rootReducer from '../reducers/index'

const routerReduxMiddleware = routerMiddleware(browserHistory)

const loggerMiddleware = createLogger({
    level: 'info', 
    collapsed: true
})

const createStoreWithMiddleware = applyMiddleware(
    thunkMiddleware, 
    loggerMiddleware, 
    routerReduxMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer, {})

const history = syncHistoryWithStore(browserHistory, store)

export default { store, history }