export const TOGGLE_DRAWER = 'TOGGLE_DRAWER'
export const SET_PROGRESS_BAR_SHOWN = 'SET_PROGRESS_BAR_SHOWN'
export const SET_FULLSCREEN_MODE = 'SET_FULLSCREEN_MODE'

export const toggleDrawer = () => ({
  type: TOGGLE_DRAWER,
})

export const setProgressBarShown = shown => ({
  type: SET_PROGRESS_BAR_SHOWN,
  payload: shown,
})

export const setFullscreenMode = mode => ({
  type: SET_FULLSCREEN_MODE,
  payload: mode,
})
