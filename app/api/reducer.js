import { fromJS } from 'immutable';

import {
  REQUEST_DATA,
  RECEIVED_DATA_SUCCESS,
  RECEIVED_DATA_ERROR,
} from './constants';

import {
  // STATUS_INIT,
  STATUS_LOADING,
  STATUS_LOADED,
  STATUS_ERROR,
} from 'utils/constants';

const initialState = fromJS({
  status: {},
  data: {},
  error: {},
});

function apiReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return state
        .setIn([
          'status',
          ...action.route.split('/'),
        ], STATUS_LOADING);
    case RECEIVED_DATA_SUCCESS: {
      const pos = action.route.split('/');
      return state
        .setIn([
          'status',
          ...pos,
        ], STATUS_LOADED)
        .setIn([
          'data',
          ...pos,
        ], fromJS(action.data));
    }
    case RECEIVED_DATA_ERROR: {
      const pos = action.route.split('/');
      return state
        .setIn([
          'status',
          ...pos,
        ], STATUS_ERROR)
        .setIn([
          'error',
          ...pos,
        ], fromJS(action.data));
    }
    default:
      return state;
  }
}

export default apiReducer;
