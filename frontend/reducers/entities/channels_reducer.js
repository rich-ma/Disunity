import merge from 'lodash/merge';
import { REMOVE_CHANNEL, RECEIVE_CHANNEL, REMOVE_CHANNEL_ERRORS, RECEIVE_CHANNEL_ERRORS } from '../../actions/channel_actions';
import { RECEIVE_SERVERS } from '../../actions/server_actions';

const channelsReducer = (state = {}, action) => {
  const newState = merge({}, state);
  Object.freeze(state);

  switch (action.type){
    case RECEIVE_SERVERS:
      if (action.payload.channels === undefined) return newState;
      return action.payload.channels;
    case REMOVE_CHANNEL:
      delete newState[action.channelId];
      return newState;
    case RECEIVE_CHANNEL:
      return merge(newState, {[action.channel.id]: action.channel})
    default:
      return state;
  }
}

export default channelsReducer;