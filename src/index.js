import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import 'babel-polyfill'
import Routers from './routers/index'
import { store, history } from './stores/configureStore'

render(<Provider store={store}>
  <Routers history={history} />
</Provider>
  , document.getElementById('root'))