import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import auth from './auth'
import queue from './queue'
import game from './game'

export default combineReducers({
  router: routerReducer,
  auth,
  queue,
  game,
})
