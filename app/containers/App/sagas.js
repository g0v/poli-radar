/* eslint-disable no-constant-condition */

import { take, call, put } from 'redux-saga/effects';
import { REQUEST_DATA } from './constants';
import { dataLoaded, dataError } from './actions';

import request from 'utils/request';
import { baseUri } from 'config';

export default function* requestData() {
  while (true) {
    yield take(REQUEST_DATA);
    const requestURL = `${baseUri}/data`;

    // Use call from redux-saga for easier testing
    const res = yield call(request, requestURL);

    // We return an object in a specific format, see utils/request.js for more information
    if (res.err === undefined || res.err === null) {
      yield put(dataLoaded(res));
    } else {
      yield put(dataError(res.err));
    }
  }
}
