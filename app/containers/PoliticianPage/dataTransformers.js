import moment from 'moment';

import { forEach, map, mapKeys } from 'lodash';

const poolMaker = {
  list: (list) => {
    const pool = {};
    list.allId.forEach((id) => {
      pool[id] = {
        id,
        label: list.byId[id].name,
        value: 0,
      };
    });
    return pool;
  },
  date: (dateRange) => {
    // make date pool
    const pool = {};
    let start = moment(dateRange.start);
    const end = moment(dateRange.end);
    let startDate = null;
    // loop through dates, create map to sum value
    while (start <= end) {
      startDate = start.format('YYYY-MM-DD');
      pool[startDate] = {
        label: startDate,
        value: 0,
      };
      start = start.add(1, 'days');
    }
    return pool;
  },
};

const valueIncremental = (target, cb = false) => {
  if (target) {
    // eslint-disable-next-line no-param-reassign
    Object.assign(target, { value: target.value + 1 });
    if (cb) cb();
  }
};

function dataTransformers(globalState, subState, events, curDateRange, politician, activeCategories) {
  const loaded = globalState.get('loaded');
  if (!loaded) return {};
  const politicians = globalState.getIn(['data', 'politicians']).toJS();
  const cities = globalState.getIn(['data', 'cities']).toJS();

  const eventCategories = (() => {
    const allId = [];
    const byId = {};
    forEach(activeCategories, (cat) => {
      allId.push(cat.id);
      byId[cat.id] = cat;
    });
    return { allId, byId };
  })();

  const activeItemCollection = {
    ...politician,
    allList: [],
    groupByDate: poolMaker.date(curDateRange),
    groupByCategory: poolMaker.list(eventCategories),
    groupByCity: poolMaker.list(cities),
  };

  events.allId.forEach((evtId) => {
    const evt = events.byId[evtId];
    const date = moment(evt.date).format('YYYY-MM-DD');
    valueIncremental(activeItemCollection.groupByDate[date], () => { activeItemCollection.allList.push(evt); });
    evt.categories.forEach((cat) => {
      valueIncremental(activeItemCollection.groupByCategory[cat.id]);
    });
    valueIncremental(activeItemCollection.groupByCity[evt.location.region.city.id]);
  });

  const checkValue = (v) => v;

  return {
    ...activeItemCollection,
    groupByDate: map(activeItemCollection.groupByDate, checkValue),
    groupByCategory: map(activeItemCollection.groupByCategory, checkValue),
    groupByCity: map(activeItemCollection.groupByCity, checkValue),
    cityObj: mapKeys(activeItemCollection.groupByCity, (v) => v.label),
  };
}

export default dataTransformers;
