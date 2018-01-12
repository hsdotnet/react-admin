import React from 'react'
import {Router} from 'react-router'
import PropTypes from 'prop-types'
import Layout from '../components/layout/layout'

const Routers = ({history}) => {
  const routes = [
    {
      path: '/',
      component: Layout,
      getIndexRoute(location, cb) {
        require.ensure([], (require) => {
          cb(null, {component: require('../containers/order/index')})
        }, 'order')
      },
      childRoutes: [
        {
          path: 'home',
          getComponent(location, cb) {
            require.ensure([], (require) => {
              cb(null, require('../containers/home/index'))
            }, 'login')
          }
        },
        {
          path: 'order',
          getComponent(location, cb) {
            require.ensure([], (require) => {
              cb(null, require('../containers/order/index'))
            }, 'login')
          }
        }, {
          path: '*',
          getComponent(location, cb) {
            require.ensure([], (require) => {
              cb(null, require('../containers/error/index'))
            }, 'error')
          }
        }
      ]
    }
  ]
  return <Router history={history} routes={routes}/>
}

Routers.propTypes = {
  history: PropTypes.object.isRequired
}

export default Routers