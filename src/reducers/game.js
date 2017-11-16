import {
  SET_CURRENT_GAME_SUCCESS
} from '../actions/queue'

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
        gid: payload
      }

    default:
      return state
  }
}
