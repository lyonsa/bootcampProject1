import {
  SIGN_IN_SUCCESS,
  SIGN_OUT_SUCCESS,
  SET_USER_PROFILE_SUCCESS,
  UPDATE_USER_PROFILE_SUCCESS,
  WATCH_USER_PROFILE_SUCCESS,
} from '../actions/auth'

export const initialState = {
  authenticated: false,
  user: null,
  profile: null,
  profileUpdateCallback: null,
}

export default (state = initialState, action) => {
  const { payload, type } = action
  switch (type) {
    // add user to state
    case SIGN_IN_SUCCESS:
      return {
        ...state,
        authenticated: true,
        user: payload,
      }
    // set user profile
    case SET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      }
    // watch user profile
    case WATCH_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profileUpdateCallback: payload,
      }
    // update user profile
    case UPDATE_USER_PROFILE_SUCCESS:
      return {
        ...state,
        profile: payload,
      }
    // reset state
    case SIGN_OUT_SUCCESS:
      return initialState
    // do nothing
    default:
      return state
  }
}
