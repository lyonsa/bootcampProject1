import firebase from 'firebase'

import { firebasePlayers, firebaseGames, firebaseQueue } from '../firebase'

const ENQUEUE_PLAYER_SUCCESS = 'ENQUEUE_PLAYER_SUCCESS'
const ENQUEUE_PLAYER_ERROR = 'ENQUEUE_PLAYER_ERROR'
const DEQUEUE_PLAYER_SUCCESS = 'DEQUEUE_PLAYER_SUCCESS'
const DEQUEUE_PLAYER_ERROR = 'DEQUEUE_PLAYER_ERROR'
const WATCH_QUEUE_STATE_SUCCESS = 'WATCH_QUEUE_STATE_SUCCESS'
const WATCH_QUEUE_STATE_ERROR = 'WATCH_QUEUE_STATE_ERROR'
const UNWATCH_QUEUE_STATE_SUCCESS = 'UNWATCH_QUEUE_STATE_SUCCESS'
const UNWATCH_QUEUE_STATE_ERROR = 'UNWATCH_QUEUE_STATE_ERROR'
const UPDATE_QUEUE_STATE_SUCCESS = 'UPDATE_QUEUE_STATE_SUCCESS'
const UPDATE_QUEUE_STATE_ERROR = 'UPDATE_QUEUE_STATE_ERROR'
const SET_CURRENT_GAME_SUCCESS = 'SET_CURRENT_GAME_ERROR'
const SET_CURRENT_GAME_ERROR = 'SET_CURRENT_GAME_ERROR'
const RECIEVE_GAME_QUESTIONS_SUCCESS = 'RECIEVE_GAME_QUESTIONS_SUCCESS'
const RECIEVE_GAME_QUESTIONS_ERROR = 'RECIEVE_GAME_QUESTIONS_ERROR'
const INCREMENT_PLAYER_SCORE_SUCCESS = 'INCREMENT_PLAYER_SCORE_SUCCESS'
const INCREMENT_PLAYER_SCORE_ERROR = 'INCREMENT_PLAYER_SCORE_ERROR'
const FINISH_CURRENT_GAME_SUCCESS = 'FINISH_CURRENT_GAME_SUCCESS'
const FINISH_CURRENT_GAME_ERROR = 'FINISH_CURRENT_GAME_ERROR'
const REQUEST_GAME_QUESTIONS_SUCCESS = 'REQUEST_GAME_QUESTIONS_SUCCESS'
const REQUEST_GAME_QUESTIONS_ERROR = 'REQUEST_GAME_QUESTIONS_ERROR'

const enqueuePlayerSuccess = () => ({
  type: ENQUEUE_PLAYER_SUCCESS,
})

const enqueuePlayerError = err => ({
  type: ENQUEUE_PLAYER_ERROR,
  payload: error,
})

const dequeuePlayerSuccess = () => ({
  type: DEQUEUE_PLAYER_SUCCESS,
})

const dequeuePlayerError = err => ({
  type: DEQUEUE_PLAYER_ERROR,
  payload: err,
})

const watchQueueStateSuccess = profileUpdateCallback => ({
  type: WATCH_QUEUE_STATE_SUCCESS,
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

const updateQueueStateSuccess = () => ({
  type: UPDATE_QUEUE_STATE_SUCCESS,
})

const updateQueueStateError = err => ({
  type: UPDATE_QUEUE_STATE_ERROR,
})

const setCurrentGameSuccess = () => ({
  type: SET_CURRENT_GAME_SUCCESS,
})

const setCurrentGameError = err => ({
  type: SET_CURRENT_GAME_ERROR,
  payload: err,
})

