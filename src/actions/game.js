import firebase from 'firebase'

import { firebasePlayers, firebaseGames, firebaseQueue } from '../firebase'

const SET_CURRENT_QUESTION_ANSWER_SUCCESS = 'SET_CURRENT_QUESTION_ANSWER_SUCCESS'
const SET_CURRENT_QUESTION_ANSWER_ERROR = 'SET_CURRENT_QUESTION_ANSWER_ERROR'
const REQUEST_GAME_QUESTIONS_SUCCESS = 'REQUEST_GAME_QUESTIONS_SUCCESS'
const REQUEST_GAME_QUESTIONS_ERROR = 'REQUEST_GAME_QUESTIONS_ERROR'
const RECIEVE_GAME_QUESTIONS_SUCCESS = 'RECIEVE_GAME_QUESTIONS_SUCCESS'
const RECIEVE_GAME_QUESTIONS_ERROR = 'RECIEVE_GAME_QUESTIONS_ERROR'
const INCREMENT_PLAYER_SCORE_SUCCESS = 'INCREMENT_PLAYER_SCORE_SUCCESS'
const INCREMENT_PLAYER_SCORE_ERROR = 'INCREMENT_PLAYER_SCORE_ERROR'
const FINISH_CURRENT_GAME_SUCCESS = 'FINISH_CURRENT_GAME_SUCCESS'
const FINISH_CURRENT_GAME_ERROR = 'FINISH_CURRENT_GAME_ERROR'

const setCurrentQuestionAnswerSuccess = () => ({
  type: SET_CURRENT_QUESTION_ANSWER_SUCCESS,
  payload: err,
})

const setCurrentQuestionAnswerError = err => ({
  type: SET_CURRENT_QUESTION_ANSWER_ERROR,
  payload: err,
})

const recieveGameQuestionsSuccess = () => ({
  type: RECIEVE_GAME_QUESTIONS_SUCCESS,
  payload: err,
})

const recieveGameQuestionsError = err => ({
  type: RECIEVE_GAME_QUESTIONS_ERROR,
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


