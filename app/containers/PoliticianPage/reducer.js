import { combineReducers } from 'redux-immutable';
import { fromJS, Map } from 'immutable';

import {
  SET_POLITICIAN,
  LOAD_EVENTS,
  EVENTS_ERROR,
  EVENTS_LOADED,
  SET_DATE_RANGE,
  SET_START_DATE,
  SET_END_DATE,
} from './constants';

function activePolitician(state = null, action) {
  switch (action.type) {
    case SET_POLITICIAN:
      return action.id;
    default:
      return state;
  }
}

const initialEventsState = fromJS({
  byId: {},
  allId: [],
  loading: false,
  error: false,
});

function events(state = initialEventsState, action) {
  switch (action.type) {
    case LOAD_EVENTS:
      return state
        .set('loading', true);
    case EVENTS_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    case EVENTS_LOADED:
      return state
        .set('loading', false)
        .set('error', false)
        .set('byId', new Map(action.data.map((evt) => [evt.id, fromJS(evt)])))
        .set('allId', fromJS(action.data.map((evt) => evt.id)));
    case SET_DATE_RANGE:
    case SET_START_DATE:
    case SET_END_DATE:
      return state
        .set('loading', true);
    default:
      return state;
  }
}

const initialDateState = fromJS({
  start: false,
  end: false,
});

function curDateRange(state = initialDateState, action) {
  switch (action.type) {
    case SET_DATE_RANGE:
      return state
        .set('start', action.range.start)
        .set('end', action.range.end);
    case SET_START_DATE:
      return state
        .set('start', action.date);
    case SET_END_DATE:
      return state
        .set('end', action.date);
    default:
      return state;
  }
}

const politicianPageReducer = combineReducers({
  activePolitician,
  events,
  curDateRange,
});

export default politicianPageReducer;
