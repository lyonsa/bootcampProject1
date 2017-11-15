import firebase from 'firebase'

import { firebaseQueue, firebaseGames } from '../firebase'

export const INIT_QUEUE_SUCCESS = 'INIT_QUEUE_SUCCESS'
export const INIT_QUEUE_ERROR = 'INIT_QUEUE_ERROR'
export const ENQUEUE_PLAYER_SUCCESS = 'ENQUEUE_PLAYER_SUCCESS'
export const ENQUEUE_PLAYER_ERROR = 'ENQUEUE_PLAYER_ERROR'
export const DEQUEUE_PLAYER_SUCCESS = 'DEQUEUE_PLAYER_SUCCESS'
export const DEQUEUE_PLAYER_ERROR = 'DEQUEUE_PLAYER_ERROR'
export const WATCH_QUEUE_STATE_SUCCESS = 'WATCH_QUEUE_STATE_SUCCESS'
export const WATCH_QUEUE_STATE_ERROR = 'WATCH_QUEUE_STATE_ERROR'
export const UNWATCH_QUEUE_STATE_SUCCESS = 'UNWATCH_QUEUE_STATE_SUCCESS'
export const UNWATCH_QUEUE_STATE_ERROR = 'UNWATCH_QUEUE_STATE_ERROR'
export const SET_CURRENT_GAME_SUCCESS = 'SET_CURRENT_GAME_ERROR'
export const SET_CURRENT_GAME_ERROR = 'SET_CURRENT_GAME_ERROR'
export const QUEUE_UPDATE_CALLBACK_SUCCESS = 'QUEUE_UPDATE_CALLBACK_SUCCESS'
export const QUEUE_UPDATE_CALLBACK_ERROR = 'QUEUE_UODATE_CALLBACK_ERROR'

const initQueueSuccess = () => ({
  type: INIT_QUEUE_SUCCESS,
})

const initQueueError = err => ({
  type: INIT_QUEUE_ERROR,
})

const enqueuePlayerSuccess = () => ({
  type: ENQUEUE_PLAYER_SUCCESS,
})

const enqueuePlayerError = err => ({
  type: ENQUEUE_PLAYER_ERROR,
  payload: err,
})

const dequeuePlayerSuccess = () => ({
  type: DEQUEUE_PLAYER_SUCCESS,
})

const dequeuePlayerError = err => ({
  type: DEQUEUE_PLAYER_ERROR,
  payload: err,
})

const watchQueueStateSuccess = queueStateUpdateCallback => ({
  type: WATCH_QUEUE_STATE_SUCCESS,
  payload: queueStateUpdateCallback,
})

const watchQueueStateError = err => ({
  type: WATCH_QUEUE_STATE_ERROR,
  payload: err,
})

const unwatchQueueStateSuccess = () => ({
  type: UNWATCH_QUEUE_STATE_SUCCESS,
})

const unwatchQueueStateError = err => ({
  type: UNWATCH_QUEUE_STATE_ERROR,
  payload: err,
})

const setCurrentGameSuccess = () => ({
  type: SET_CURRENT_GAME_SUCCESS,
})

const setCurrentGameError = err => ({
  type: SET_CURRENT_GAME_ERROR,
  payload: err,
})

const queueUpdateCallbackSuccess = () => ({
  type: QUEUE_UPDATE_CALLBACK_SUCCESS,
})

const queueUpdateCallbackError = err => ({
  type: QUEUE_UPDATE_CALLBACK_ERROR,
  payload: err,
})

export const initQueueState = () => {
  return async (dispatch, getState) => {
    try {
      // get player uid
      const { uid } = getState().auth.user
      // enqueue player
      await dispatch(enqueuePlayer(uid))
      // watch queue state
      dispatch(watchQueueState())
      dispatch(initQueueSuccess())
    } catch (err) {
      console.error(`Error initializing queue state: ${err.message}`)
      dispatch(initQueueError(err))
    }
  }
}

const enqueuePlayer = uid => {
  return async dispatch => {
    try {
      // enqueue player ref
      const queuePlayerRef = firebaseQueue.child(uid) 
      // register ref and set timestamp
      // remove value on disconnect
      await queuePlayerRef.onDisconnect().remove()
      await queuePlayerRef.set({ timestamp: Date.now() })
      dispatch(enqueuePlayerSuccess())
    } catch (err) {
      console.error(`Error enqueuing player: ${err.message}`)
      dispatch(enqueuePlayerError(err))
    }
  }
}

const watchQueueState = uid => {
  return async dispatch => {
    try {
      // set firebase listener
      // order snap by timestamp
      const queueStateUpdateCallback = firebaseQueue
        .orderByChild('timestamp')
        .on('value', snap => dispatch(onQueueUpdate(snap)))
      dispatch(watchQueueStateSuccess(queueStateUpdateCallback))
    } catch (err) {
      console.error(`Error watching queue state: ${err.message}`)
      dispatch(enqueuePlayerError(err))
    }
  }
}

const unwatchQueueState = () => {
  return (dispatch, getState) => {
    try {
      // get on queue update callback
      const { queueStateUpdateCallback } = getState().queue
      // remove listener
      firebaseQueue.orderByChild('timestamp')
        .off('value', queueStateUpdateCallback)
      dispatch(unwatchQueueStateSuccess())
    } catch (err) {
      console.error(`Error unwatching queue state: ${err.message}`)
      dispatch(unwatchQueueStateError(err))
    }
  }
}

const onQueueUpdate = snap => {
  return async (dispatch, getState) => {
    try {
      // get current uid for reference
      const { uid } = getState().auth.user
      // get index of user in queue object
      const queue = snap.val()
      const index = Object.keys(queue).indexOf(uid)
      // check user position is 0
      if (index === 0) {
        // user should continue in queue
        return dispatch(movePlayerToGame())
      }
      dispatch(queueUpdateCallbackSuccess())
    } catch (err) {
      console.error(`Error in queue state update callback: ${err.message}`)
      dispatch(queueUpdateCallbackError(err))
    }
  }
}

const movePlayerToGame = () => {
  return async (dispatch, getState) => {
    try {
      dispatch({ type: 'MOVE_PLAYER_TO_GAME_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'MOVE_PLAYER_TO_GAME_ERROR' })
    }
  }
}
