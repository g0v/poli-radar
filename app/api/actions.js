import {
  REQUEST_DATA,
  RECEIVED_DATA_SUCCESS,
  RECEIVED_DATA_ERROR,
} from './constants';

export function requestData(route, params = {}) {
  return {
    type: REQUEST_DATA,
    route,
    params,
  };
}

export function receivedDataSuccess(route, data) {
  return {
    type: RECEIVED_DATA_SUCCESS,
    route,
    data,
  };
}

export function receivedDataError(route, error) {
  return {
    type: RECEIVED_DATA_ERROR,
    route,
    error,
  };
}
