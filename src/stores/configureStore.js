import { applyMiddleware, combineReducers, createStore } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { browserHistory } from 'react-router'
import { createLogger } from 'redux-logger'
import { routerMiddleware, routerReducer, syncHistoryWithStore } from 'react-router-redux'
import rootSaga from '../sagas/index'

import rootReducer from '../reducers/index'

const routerReduxMiddleware = routerMiddleware(browserHistory)

const loggerMiddleware = createLogger({
    level: 'info',
    collapsed: true
})

const sagaMiddleware = createSagaMiddleware()

const createStoreWithMiddleware = applyMiddleware(
    sagaMiddleware,
    loggerMiddleware,
    routerReduxMiddleware
)(createStore)

const store = createStoreWithMiddleware(rootReducer, {})

sagaMiddleware.run(rootSaga)

const history = syncHistoryWithStore(browserHistory, store)

export default { store, history }