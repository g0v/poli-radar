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
        .setIn(['data', 'politicians', 'byId'], new Map(action.data.politicians.data.map((p) => [p.id, p])))
        .setIn(['data', 'politicians', 'allId'], fromJS(action.data.politicians.data.map((p) => p.id)))
        .setIn(['data', 'politicianCategories', 'byId'], new Map(action.data.politicianCategories.data.map((pc) => [pc.id, pc])))
        .setIn(['data', 'politicianCategories', 'allId'], fromJS(action.data.politicianCategories.data.map((pc) => pc.id)))
        .setIn(['data', 'politicianTraits', 'byId'], new Map(action.data.politicianTraits.data.map((pt) => [pt.id, pt])))
        .setIn(['data', 'politicianTraits', 'allId'], fromJS(action.data.politicianTraits.data.map((pt) => pt.id)))
        .setIn(['data', 'cities', 'byId'], new Map(action.data.cities.data.map((c) => [c.id, c])))
        .setIn(['data', 'cities', 'allId'], fromJS(action.data.cities.data.map((c) => c.id)))
        .setIn(['data', 'regions', 'byId'], new Map(action.data.regions.data.map((r) => [r.id, r])))
        .setIn(['data', 'regions', 'allId'], fromJS(action.data.regions.data.map((r) => r.id)));
    case DATA_ERROR:
      return state
        .set('loading', false)
        .set('error', true);
    default:
      return state;
  }
}

export default globalReducer;
