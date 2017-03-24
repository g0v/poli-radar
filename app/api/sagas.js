import { takeEvery } from 'redux-saga';
import { put, call } from 'redux-saga/effects';

import { isArray, forEach } from 'lodash';

import request from 'utils/request';
import { BASE_URI } from 'config';

import {
  REQUEST_DATA,
} from './constants';

import {
  receivedDataSuccess,
  receivedDataError,
} from './actions';

export function* fetchData(action) {
  const url = new URL(`${BASE_URI}/${action.route}`);
  forEach(action.params, (value, key) => {
    if (isArray(value)) {
      value.map((v) => url.searchParams.append(`${key}[]`, v));
    } else {
      url.searchParams.append(key, value);
    }
  });

  const options = {
    method: 'GET',
    // headers: baseHeader,
  };

  const response = yield call(request, url, options);

  if (!response.err) {
    yield put(receivedDataSuccess(action.route, response));
  } else {
    yield put(receivedDataError(action.route, response.err));
  }
}

function* watchFetchData() {
  yield takeEvery(REQUEST_DATA, fetchData);
}

// All sagas to be loaded
export default [
  watchFetchData,
];
