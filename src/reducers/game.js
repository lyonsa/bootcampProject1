import { SET_CURRENT_GAME_SUCCESS } from '../actions/queue'
import { UPDATE_GAME_STATE_SUCCESS } from '../actions/game'

const initalState = {
  gid: null,
  game: null,
}

export default (state = initalState, action) => {
  const { type, payload } = action
  switch (type) {
    case SET_CURRENT_GAME_SUCCESS:
      return {
        ...state,
        gid: payload,
      }
    
    case UPDATE_GAME_STATE_SUCCESS:
      return {
        ...state,
        game: payload,
      }

    default:
      return state
  }
}
