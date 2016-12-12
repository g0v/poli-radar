/* eslint-disable no-constant-condition */

import { take, call, put, select, cancel } from 'redux-saga/effects';
import { takeEvery } from 'redux-saga';
import { LOCATION_CHANGE } from 'react-router-redux';

import {
  LOAD_EVENTS,
  SET_DATE_RANGE,
  SET_START_DATE,
  SET_END_DATE,
} from './constants';

import {
  eventsLoaded,
  eventsError,
} from './actions';

import request from 'utils/request';
import {
  selectPoliticianId,
  selectCurDateRange,
} from './selectors';

import { baseUri } from 'config';

export function* fetchEventsByParams(action) {
  const curRange = yield select(selectCurDateRange());
  const dateStrings = (curRange.start && curRange.end) ? Object.keys(curRange).map((key) => `${key}=${curRange[key]}`).join('&') : '';
  const params = {};

  params.politician = yield select(selectPoliticianId());

  const paramStrings = Object.keys(params).map((key) => `${key}=${params[key]}`).join('&');
  const requestURL = `${baseUri}/events?${paramStrings}&${dateStrings}`;
  // Call our request helper (see 'utils/request')
  const response = yield call(request, requestURL);

  if (!response.err) {
    yield [
      put(eventsLoaded(response.data.events)),
      action.callback ? put(action.callback()) : false,
    ];
  } else {
    yield put(eventsError(response.err));
  }
}

export function* eventDataFetcher() {
  // Fork watcher so we can continue execution
  const watcher = yield takeEvery([
    LOAD_EVENTS,
    SET_DATE_RANGE,
    SET_START_DATE,
    SET_END_DATE,
  ], fetchEventsByParams);

  // Suspend execution until location changes
  yield take(LOCATION_CHANGE);
  yield cancel(watcher);
}

// Bootstrap sagas
export default [
  eventDataFetcher,
];
