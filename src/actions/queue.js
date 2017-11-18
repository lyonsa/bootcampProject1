import firebase from 'firebase'
import axios from 'axios'
import { routerActions } from 'react-router-redux'

import { firebaseQueue, firebaseGames } from '../firebase'

export const INIT_QUEUE_SUCCESS = 'INIT_QUEUE_SUCCESS'
export const INIT_QUEUE_ERROR = 'INIT_QUEUE_ERROR'
export const SETUP_NEW_GAME_SUCCESS = 'SETUP_NEW_GAME_SUCCESS'
export const SETUP_NEW_GAME_ERROR = 'SETUP_NEW_GAME_ERROR'
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
export const PUSH_PLAYER_TO_GAME_SUCCESS = 'PUSH_USER_TO_GAME_SUCCESS'
export const PUSH_PLAYER_TO_GAME_ERROR = 'PUSH_USER_TO_GAME_ERROR'

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

const setCurrentGameSuccess = gid => ({
  type: SET_CURRENT_GAME_SUCCESS,
  payload: gid,
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

const pushPlayerToGameSuccess = () => ({
  type: PUSH_PLAYER_TO_GAME_SUCCESS,
})

const pushPlayerToGameError = err => ({
  type: PUSH_PLAYER_TO_GAME_ERROR,
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

const dequeuePlayer = uid => {
  return async dispatch => {
    try {
      // dequeue player
      await firebaseQueue.child(uid).remove()
      dispatch(dequeuePlayerSuccess())
    } catch (err) {
      console.error(`Error dequeuing player: ${err.message}`)
      dispatch(dequeuePlayerError(err))
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

const pushPlayerToGame = (gid, uid) => {
  return async dispatch => {
    try {
      await firebaseGames.child(gid).update({ uid2: uid })
      dispatch(pushPlayerToGameSuccess())
    } catch (err) {
      console.error(`Error pushing player to game: ${err.message}`)      
      dispatch(pushPlayerToGameError(err))
    }
  }
}

const queryOpenGames = async () => {
  try {
    const { data } = await axios.get('https://unc-trivia-app-api.herokuapp.com/games/?open=true')
    const openGames = data.games
    return openGames
  } catch (err) {
    console.error(`Error querying for open games ${err.message}`)
  }
}

const setupNewGame = async uid => {
  try {
    // push game to firebase
    const gameRef = await firebaseGames.push({ 
      uid1: uid,
      timestamp: Date.now()
    })
    const gid = await gameRef.key
    // inject questions via api
    await axios.post('https://unc-trivia-app-api.herokuapp.com/games/init-game', {
      category: 'computer science',
      gid
    })
    return gid
  } catch (err) {
    console.error(`Error setting up new game: ${err.message}`)
  }
}

const movePlayerToGame = () => {
  return async (dispatch, getState) => {
    try {
      // get user id
      const { uid } = getState().auth.user 
      // resolve game
      const openGames = await queryOpenGames()
      console.log(`OPEN_GAMES -> ${openGames}`)
      let gid
      if (openGames.length) {
        // get game id
        gid = openGames[0]
        // push player to game
        dispatch(pushPlayerToGame(gid, uid))
        // set current game
        dispatch(setCurrentGameSuccess(gid))
      } else {
        // get new game id
        gid = await setupNewGame(uid)
        // set current game
        dispatch(setCurrentGameSuccess(gid))
      }
      // set game

      // unwatch queue state
      dispatch(unwatchQueueState())
      // dequeue player
      await dispatch(dequeuePlayer(uid))
      // move to game route
      dispatch(routerActions.push('/game'))
      dispatch({ type: 'MOVE_PLAYER_TO_GAME_SUCCESS' })
    } catch (err) {
      dispatch({ type: 'MOVE_PLAYER_TO_GAME_ERROR' })
    }
  }
}
