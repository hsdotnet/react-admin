import {combineReducers} from 'redux';
import {routerReducer} from 'react-router-redux';

import layout from './layout';

const Index = combineReducers({
    layout,
    routing: routerReducer
  });
  
export default Index