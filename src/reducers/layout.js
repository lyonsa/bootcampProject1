import {
  TOGGLE_DRAWER,
  SET_PROGRESS_BAR_SHOWN,
  SET_FULLSCREEN_MODE,
} from '../actions/layout'

const initalState = {
  drawerIsOpen: false,
  progressBarShown: false,
  fullscreenMode: false,
}

export default (state = initalState, action) => {
  const { payload, type } = action
  switch (type) {
    case TOGGLE_DRAWER:
      return {
        ...state,
        drawerIsOpen: !state.drawerIsOpen,
      }
    
    case SET_PROGRESS_BAR_SHOWN:
      return {
        ...state,
        progressBarShown: payload,
      }

    case SET_FULLSCREEN_MODE:
      return {
        ...state,
        fullscreenMode: payload,
      }

    default:
      return state
  }
}
