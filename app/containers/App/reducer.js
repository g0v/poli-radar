/*
 *
 * App reducer
 *
 */

import { fromJS, Map } from 'immutable';
import {
  REQUEST_DATA,
  DATA_LOADED,
  DATA_ERROR,
} from './constants';

const initialState = fromJS({
  data: {
    date: {
      start: false,
      end: false,
    },
    politicians: {
      byId: {},
      allId: [],
    },
    politicianCategories: {
      byId: {},
      allId: [],
    },
    politicianTraits: {
      byId: {},
      allId: [],
    },
    cities: {
      byId: {},
      allId: [],
    },
    regions: {
      byId: {},
      allId: [],
    },
  },
  loaded: false,
  loading: false,
  error: false,
});

const byIdMap = (original) => new Map(original.map((o) => [o.id, fromJS(o)]));
const allIdMap = (original) => fromJS(original.map((o) => o.id));

function globalReducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST_DATA:
      return state
        .set('loading', true);
    case DATA_LOADED:
      return state
        .set('error', false)
        .set('loading', false)
        .set('loaded', true)
        .setIn(['data', 'date', 'start'], action.data.date.start)
        .setIn(['data', 'date', 'end'], action.data.date.end)
        .setIn(['data', 'politicians', 'byId'], byIdMap(action.data.politicians.data))
        .setIn(['data', 'politicians', 'allId'], allIdMap(action.data.politicians.data))
        .setIn(['data', 'politicianCategories', 'byId'], byIdMap(action.data.politicianCategories.data))
        .setIn(['data', 'politicianCategories', 'allId'], allIdMap(action.data.politicianCategories.data))
        .setIn(['data', 'politicianTraits', 'byId'], byIdMap(action.data.politicianTraits.data))
        .setIn(['data', 'politicianTraits', 'allId'], allIdMap(action.data.politicianTraits.data))
        .setIn(['data', 'cities', 'byId'], byIdMap(action.data.cities.data))
        .setIn(['data', 'cities', 'allId'], allIdMap(action.data.cities.data))
        .setIn(['data', 'regions', 'byId'], byIdMap(action.data.regions.data))
        .setIn(['data', 'regions', 'allId'], allIdMap(action.data.regions.data));
    case DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default globalReducer;
