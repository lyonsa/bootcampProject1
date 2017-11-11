import firebase from 'firebase'
import { routerActions } from 'react-router-redux'

import { firebaseAuth } from '../firebase'

// action types
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'

export const signInError = (err) => ({
  type: SIGN_IN_ERROR,
  payload: err,
})

export const signInSuccess = ({ user }) => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
})

export const authenticate = (provider) => {
  return async dispatch => {
    try {
      const data = await firebaseAuth.signInWithPopup(provider)
      dispatch(signInSuccess(data))
      dispatch(routerActions.push('/'))
    } catch (err) {
      console.error(`Error authenticating: ${err}`)
      dispatch(signInError(err))
    }
  }
}

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
})

export const signInWithGoogle = () => {
  return authenticate(new firebase.auth.GoogleAuthProvider())
}

export const signInWithGithub = () => {
  return authenticate(new firebase.auth.GithubAuthProvider())
}

export const signInWithFacebook = () => {
  return authenticate(new firebase.auth.FacebookAuthProvider())
}

export const signOut = () => {
  return async dispatch => {
    await firebaseAuth.signOut()
    dispatch(signOutSuccess())
  }
}
