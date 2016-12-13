/*
 *
 * App actions
 *
 */

import {
  REQUEST_DATA,
  DATA_LOADED,
  DATA_ERROR,
  SET_POLITICIAN,
} from './constants';

export function requestData() {
  return {
    type: REQUEST_DATA,
  };
}

export function dataLoaded(data) {
  return {
    type: DATA_LOADED,
    data,
  };
}

export function dataError(error) {
  return {
    type: DATA_ERROR,
    error,
  };
}

export function setPolitician(id) {
  return {
    type: SET_POLITICIAN,
    id,
  };
}
