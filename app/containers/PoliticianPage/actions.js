import {
  SET_POLITICIAN,
  LOAD_EVENTS,
  EVENTS_ERROR,
  EVENTS_LOADED,
  SET_DATE_RANGE,
  SET_START_DATE,
  SET_END_DATE,
} from './constants';

export function setPolitician(id) {
  return {
    type: SET_POLITICIAN,
    id,
  };
}

export function loadEvents(callback) {
  return {
    type: LOAD_EVENTS,
    callback,
  };
}

export function eventsLoaded(data) {
  return {
    type: EVENTS_LOADED,
    data,
  };
}

export function eventsError(error) {
  return {
    type: EVENTS_ERROR,
    error,
  };
}

export function setDateRange(range) {
  return {
    type: SET_DATE_RANGE,
    range,
  };
}

export function setStartDate(date) {
  return {
    type: SET_START_DATE,
    date,
  };
}

export function setEndDate(date) {
  return {
    type: SET_END_DATE,
    date,
  };
}
