import firebase from 'firebase'
import { routerActions } from 'react-router-redux'

import { firebasePlayers, firebaseGames, firebaseQueue } from '../firebase'

export const INIT_GAME_SUCCESS = 'INIT_GAME_SUCCESS'
export const INIT_GAME_ERROR = 'INIT_GAME_ERROR'
export const SET_CURRENT_QUESTION_ANSWER_SUCCESS = 'SET_CURRENT_QUESTION_ANSWER_SUCCESS'
export const SET_CURRENT_QUESTION_ANSWER_ERROR = 'SET_CURRENT_QUESTION_ANSWER_ERROR'
export const WATCH_GAME_STATE_SUCCESS = 'WATCH_GAME_STATE_SUCCESS'
export const WATCH_GAME_STATE_ERROR = 'WATCH_GAME_STATE_ERROR'
export const UNWATCH_GAME_STATE_SUCCESS = 'UNWATCH_GAME_STATE_SUCCESS'
export const UNWATCH_GAME_STATE_ERROR = 'UNWATCH_GAME_STATE_ERROR'
export const UPDATE_GAME_STATE_SUCCESS = 'UPDATE_GAME_STATE_SUCCESS'
export const UPDATE_GAME_STATE_ERROR = 'UPDATE_GAME_STATE_ERROR'
export const REQUEST_GAME_QUESTIONS_SUCCESS = 'REQUEST_GAME_QUESTIONS_SUCCESS'
export const REQUEST_GAME_QUESTIONS_ERROR = 'REQUEST_GAME_QUESTIONS_ERROR'
export const RECIEVE_GAME_QUESTIONS_SUCCESS = 'RECIEVE_GAME_QUESTIONS_SUCCESS'
export const RECIEVE_GAME_QUESTIONS_ERROR = 'RECIEVE_GAME_QUESTIONS_ERROR'
export const INCREMENT_PLAYER_SCORE_SUCCESS = 'INCREMENT_PLAYER_SCORE_SUCCESS'
export const INCREMENT_PLAYER_SCORE_ERROR = 'INCREMENT_PLAYER_SCORE_ERROR'
export const FINISH_CURRENT_GAME_SUCCESS = 'FINISH_CURRENT_GAME_SUCCESS'
export const FINISH_CURRENT_GAME_ERROR = 'FINISH_CURRENT_GAME_ERROR'

const initGameSuccess = () => ({
  type: INIT_GAME_SUCCESS
})

const initGameError = err => ({
  type: INIT_GAME_ERROR,
  payload: err,
})

const setCurrentQuestionAnswerSuccess = () => ({
  type: SET_CURRENT_QUESTION_ANSWER_SUCCESS,
})

const setCurrentQuestionAnswerError = err => ({
  type: SET_CURRENT_QUESTION_ANSWER_ERROR,
  payload: err,
})

const incrementPlayerScoreSuccess = () => ({
  type: INCREMENT_PLAYER_SCORE_SUCCESS,
})

const incrementPlayerScoreError = err => ({
  type: INCREMENT_PLAYER_SCORE_ERROR,
  payload: err,
})

const finishCurrentGameSuccess = () => ({
  type: FINISH_CURRENT_GAME_SUCCESS
})

const finishCurrentGameError = err => ({
  type: FINISH_CURRENT_GAME_ERROR,
  payload: err,
})

const watchGameStateSuccess = onGameUpdateCallback => ({
  type: WATCH_GAME_STATE_SUCCESS,
  payload: onGameUpdateCallback,
})

const watchGameStateError = err => ({
  type: WATCH_GAME_STATE_ERROR,
  payload: err,
})

const unwatchGameStateSuccess = () => ({
  type: UNWATCH_GAME_STATE_SUCCESS,
})

const unwatchGameStateError = err => ({
  type: UNWATCH_GAME_STATE_ERROR,
  payload: err,
})

const updateGameStateSuccess = game => ({
  type: UPDATE_GAME_STATE_SUCCESS,
  payload: game,
})

const updateGameStateError = err => ({
  type: UPDATE_GAME_STATE_ERROR,
  payload: err,
})

export const initGame = () => {
  return async (dispatch, getState) => {
    try {
      // get game id
      const { gid } = getState().game
      // watch the game state
      dispatch(watchGameState(gid))
      dispatch(initGameSuccess())
    } catch (err) {
      console.error(`Error initializing game state: ${err.message}`)
      dispatch(initGameError(err))
    }
  }
}

const watchGameState = gid => {
  return async dispatch => {
    try {
      const onGameUpdateCallback = firebaseGames.child(gid)
        .on('value', snap => dispatch(onGameStateUpdate(snap)))
      dispatch(watchGameStateSuccess(onGameUpdateCallback))
    } catch (err) {
      console.error(`Error initializing game state: ${err.message}`)
      dispatch(watchGameStateError(err))
    }
  }
}

const unwatchGameState = () => {
  return (dispatch, getState) => {
    try {
      // get game update callback and id
      const { onGameUpdateCallback, gid } = getState().game
      // remove listener
      firebaseGames.child(gid).off('value', onGameUpdateCallback)
      dispatch(unwatchGameStateSuccess())
    } catch (err) {
      console.error(`Error initalizing game state: ${err.message}`)
      dispatch(unwatchGameStateError(err))
    }
  }
}

const onGameStateUpdate = snap => {
  return dispatch => {
    try {
      // get game state
      const game = snap.val()
      console.log('INCOMING GAME ->', game)
      // remove listener if questions and uid are present
      if (game.uid2 && game.questions) {
        dispatch(unwatchGameState())
      }
      // update state
      dispatch(updateGameStateSuccess(game))
    } catch (err) {
      console.error(`Error updating the game state: ${err.message}`)
      dispatch(updateGameStateError(err))
    }
  }
}

export const setCurrentQuestionAnswer = (index, answer, correct) => {
  return async (dispatch, getState) => {
    try {
      // get game and user id
      const { game, auth } = getState()
      const { gid } = game
      const { uid } = auth.user
      // set answer
      await firebaseGames.child(gid)
        .child('answers')
        .child(uid)
        .child(index)
        .set({ answer, correct })
      dispatch(setCurrentQuestionAnswerSuccess())
    } catch (err) {
      console.error(`Error setting answer for question ${index}: ${err.message}`)
      dispatch(setCurrentQuestionAnswerError(err))
    }
  }
}

export const incrementPlayerScore = (factor) => {
  return async (dispatch, getState) => {
    try {
      // get user id
      const { uid } = getState().auth.user
      // increment score by factor
      await firebasePlayers.child(uid)
        .child('lifetimeScore')
        .transaction(curr => curr + factor)
      dispatch(incrementPlayerScoreSuccess())
    } catch (err) {
      console.error(`Error incrementing player score: ${err.message}`)
      dispatch(incrementPlayerScoreError(err))
    }
  }
}

export const finishCurrentGame = () => {
  return (dispatch, getState) => {
    try {
      const { gid } = getState().game
      dispatch(routerActions.push(`/game-log/${gid}`))
      // redirect to game-log route
      dispatch(finishCurrentGameSuccess())
    } catch (err) {
      console.error(`Error finishing game state: ${err.message}`)
      dispatch(finishCurrentGameError(err))
    }
  }
}
