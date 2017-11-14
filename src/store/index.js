import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

import rootReducer from '../reducers'
import saveState from './save-state'
import loadState from './load-state'
import history from '../history'
import { resumeUserSession } from '../actions/auth'

// get inital state
const persistedState = loadState()

// create store
const store = createStore(
  rootReducer,
  persistedState,
  applyMiddleware(thunk, logger, routerMiddleware(history))
)

if (persistedState && persistedState.auth && persistedState.auth.user) {
  // resume user session
  store.dispatch(resumeUserSession())
}

// serialize state to local storage on change
store.subscribe(() => {
  saveState(store.getState())
})

export default store
