import { WATCH_QUEUE_STATE_SUCCESS } from '../actions/queue'

const initalState = {
  queueStateUpdateCallback: null
}

export default (state = initalState, action) => {
  const { type, payload } = action
  switch (type) {
    case WATCH_QUEUE_STATE_SUCCESS:
      return {
        ...state,
        queueStateUpdateCallback: payload
      }
    default:
      return state
  }
}
