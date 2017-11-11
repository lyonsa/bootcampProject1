import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers'
import saveState from './save-state'
import loadState from './load-state'
import history from '../history'

// get inital state
const persistedState = loadState()

// create store
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger, routerMiddleware(history))
)

// serialize state to local storage on change
store.subscribe(() => {
  saveState(store.getState())
})

export default store
