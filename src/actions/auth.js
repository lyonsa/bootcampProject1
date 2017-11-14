import firebase from 'firebase'
import { routerActions } from 'react-router-redux'

import { firebaseAuth, firebasePlayers, firebaseDb } from '../firebase'
import { isNewUser } from '../utils'

// action types
export const SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS'
export const SIGN_IN_ERROR = 'SIGN_IN_ERROR'
export const SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS'
export const SETUP_NEW_USER_SUCCESS = 'SETUP_NEW_USER_SUCCESS'
export const SETUP_NEW_USER_ERROR = 'SETUP_NEW_USER_ERROR'
export const SET_USER_PRESENCE_SUCCESS = 'SET_USER_PRESENCE_SUCCESS'
export const SET_USER_PRESENCE_ERROR = 'SET_USER_PRESENCE_ERROR'
export const SET_USER_PROFILE_SUCCESS = 'SET_USER_PROFILE_SUCCESS'
export const SET_USER_PROFLE_ERROR = 'SET_USER_PROFILE_ERROR'
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS'
export const UPDATE_USER_PROFILE_ERROR = 'UPDATE_USER_PROFILE_FAILURE'
export const WATCH_USER_PROFILE_SUCCESS = 'WATCH_USER_PROFILE_SUCCESS'
export const WATCH_USER_PROFILE_ERROR = 'WATCH_USER_PROFILE_ERROR'
export const UNWATCH_USER_PROFILE_SUCCESS = 'UNWATCH_USER_PROFILE_SUCCESS'
export const UNWATCH_USER_PROFILE_ERROR = 'UNWATCH_USER_PROFILE_ERROR'
export const RESUME_USER_SESSION_SUCCESS = 'RESUME_USER_SESSION_SUCCESS'
export const RESUME_USER_SESSION_ERROR = 'RESUME_USER_SESSION_ERROR'

// action creators
export const signInSuccess = user => ({
  type: SIGN_IN_SUCCESS,
  payload: user,
})

export const signInError = err => ({
  type: SIGN_IN_ERROR,
  payload: err,
})

export const signOutSuccess = () => ({
  type: SIGN_OUT_SUCCESS,
})

export const setupNewUserSuccess = () => ({
  type: SETUP_NEW_USER_SUCCESS,
})

export const setupNewUserError = err => ({
  type: SETUP_NEW_USER_ERROR,
  payload: err,
})

export const setUserPresenceSuccess = () => ({
  type: SET_USER_PRESENCE_SUCCESS,
})

export const setUserPresenceError = err => ({
  type: SET_USER_PRESENCE_ERROR,
  payload: err,
})

export const setUserProfileSuccess = profile => ({
  type: SET_USER_PROFILE_SUCCESS,
  payload: profile,
})

export const setUserProfileError = err => ({
  type: SET_USER_PROFLE_ERROR,
  payload: err,
})

export const updateUserProfileSuccess = profile => ({
  type: UPDATE_USER_PROFILE_SUCCESS,
  payload: profile,
})

export const updateUserProfileError = err => ({
  type: UPDATE_USER_PROFILE_ERROR,
  payload: err,
})

export const watchUserProfileSuccess = profileUpdateCallback => ({
  type: WATCH_USER_PROFILE_SUCCESS,
  payload: profileUpdateCallback,
})

export const watchUserProfileError = err => ({
  type: WATCH_USER_PROFILE_ERROR,
  payload: err,
})

export const unwatchUserProfileSuccess = () => ({
  type: UNWATCH_USER_PROFILE_SUCCESS,
})

export const unwatchUserProfileError = err => ({
  type: UNWATCH_USER_PROFILE_ERROR,
  payload: err,
})

export const resumeUserSessionSuccess = err => ({
  type: RESUME_USER_SESSION_SUCCESS,
}) 

export const resumeUserSessionError = err => ({
  type: RESUME_USER_SESSION_ERROR,
  payload: err,
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

// thunk actions
export const authenticate = (provider) => {
  return async dispatch => {
    try {
      // authenticate
      const data = await firebaseAuth.signInWithPopup(provider)
      const { user } = data
      console.log(`\n\nUSER -> ${user}\n\n`)
      const { uid } = user         
      dispatch(signInSuccess(user))
      // setup newly registered users
      if (isNewUser(user)) await dispatch(setupNewUser())
      // set user presence
      await dispatch(setUserPresence(uid))      
      // set user profile
      await dispatch(setUserProfile(uid))
      // redirect to home
      await dispatch(routerActions.push('/'))
      // watch user profile for changes
      await dispatch(watchUserProfile(uid))
    } catch (err) {
      console.error(`Error authenticating: ${err}`)
      dispatch(signInError(err))
    }
  }
}

export const signOut = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth 
      // unwatch user profile for changes
      dispatch(unwatchUserProfile())
      // go offline
      await firebasePlayers.child(`${user.uid}/online`).remove()
      // signout
      await firebaseAuth.signOut()
      dispatch(signOutSuccess())
    } catch (err) {
      console.error(`Error sigining out: ${err}`)
    }
  }
}

export const setUserPresence = uid => {
  return async dispatch => {
    try {
      // get ref
      const isOnline = firebaseDb.ref('.info/connected')
      // register user presence callback
      const onlineRef = await firebasePlayers.child(`${uid}/online`)
      isOnline.on('value', snap => dispatch(updateUserPresence(snap, onlineRef)))
      dispatch(setUserPresenceSuccess())
    } catch (err) {
      console.error(`Error setting user presence: ${err}`)
      dispatch(setUserPresenceError(err))
    }
  }
}

export const updateUserPresence = (snap, ref) => {
  return async dispatch => {
    if (snap.val()) {
      ref.onDisconnect().remove()
      ref.set(true)
    }
  }
}

export const setUserProfile = uid => {
  return async dispatch => {
    try {
      // get profile
      const ref = firebasePlayers.child(uid)
      const snap = await ref.once('value')
      const profile = snap.val()
      dispatch(setUserProfileSuccess(profile))
    } catch (err) {
      console.error(`Error setting user profile: ${err}`)
      dispatch(setUserProfileError(err))
    }
  }
}

export const updateUserProfile = snap => {
  return async dispatch => {
    try {
      const profile = snap.val()
      dispatch(updateUserProfileSuccess(profile))
    } catch (err) {
      console.error(`Error updating user profile: ${err}`)
      dispatch(updateUserProfileError(err))
    }
  }
}

export const watchUserProfile = uid => {
  return async dispatch => {
    try {
      // set firebase listener
      const profileUpdateCallback = firebasePlayers.child(uid)
        .on('child_changed', snap => dispatch(updateUserProfile(snap)))
      dispatch(watchUserProfileSuccess(profileUpdateCallback))
    } catch (err) {
      console.error(`Error watching user profile: ${err}`)
      dispatch(watchUserProfileError(err))
    }
  }
}

export const unwatchUserProfile = uid => {
  return async (dispatch, getState) => {
    try {
      // get user uid and profileUpdateCallback
      const { user, profileUpdateCallback } = getState().auth
      const { uid } = user
      // remove listener
      firebasePlayers.child(uid).off('child_changed', profileUpdateCallback)
      dispatch(unwatchUserProfileSuccess())
    } catch (err) {
      console.error(`Error unwatching user profile: ${err}`)
      dispatch(unwatchUserProfileError(err))
    }
  }
}

export const setupNewUser = () => {
  return async (dispatch, getState) => {
    try {
      // get relevant user data
      const { user } = getState().auth
      const { uid, displayName, photoURL } = user
      // init user in players tree
      await firebasePlayers.child(uid).set({
        lifetimeScore: 0,
        // have to set to false
        // firebase does not register `null` or `undefined`
        // would result in a no-op
        currentGame: false,
        displayName,
        photoURL,
      })
      dispatch(setupNewUserSuccess())
    } catch (err) {
      console.log(`Error setting up new user: ${err}`)
      dispatch(setupNewUserError(err))
    }
  }
}

export const resumeUserSession = () => {
  return async (dispatch, getState) => {
    try {
      const { user } = getState().auth
      const { uid } = user
      // set user presence
      await dispatch(setUserPresence(uid))      
      // set user profile
      await dispatch(setUserProfile(uid))
      // watch user profile
      await dispatch(watchUserProfile(uid))
      dispatch(resumeUserSessionSuccess())
    } catch (err) {
      console.error(`Error resuming user session: ${err}`)
      dispatch(resumeUserSessionError(err))
      dispatch(signOut())
    }
  } 
}
