import { createSelector } from 'reselect';

// selectLocationState expects a plain JS object for the routing state
const selectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('route'); // or state.route

    if (!routingState.equals(prevRoutingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

/**
 * Direct selector to the homePage state domain
 */
const selectGlobalDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */

const selectDateRange = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'date']).toJS()
);

const selectPoliticians = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'politicians']).toJS()
);

const selectPoliticianCategories = () => createSelector(
  selectGlobalDomain(),
  (globalState) => {
    const categories = globalState.getIn(['data', 'politicianCategories']).toJS();
    const politicians = globalState.getIn(['data', 'politicians']).toJS();
    return categories.allId.filter((id) => categories.byId[id].politicians
      .some((pId) => politicians.byId[pId].hasData))
      .map((id) => categories.byId[id]);
  }
);

const selectPoliticianTraits = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'politicianTraits']).toJS()
);

const selectCities = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'cities']).toJS()
);

const selectRegions = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'regions']).toJS()
);

const selectLoaded = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.get('loaded')
);

const selectLoadingState = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.get('loading')
);

const selectErrorState = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.get('error')
);

const selectPolitician = () => createSelector(
  selectGlobalDomain(),
  (globalState) => globalState.getIn(['data', 'politicians', 'byId', globalState.get('politician'), 'name'])
);

/**
 * Default selector used by Global
 */

const selectGlobal = () => createSelector(
  selectGlobalDomain(),
  (substate) => substate.toJS()
);

export default selectGlobal;

export {
  selectDateRange,
  selectLoaded,
  selectLocationState,
  selectLoadingState,
  selectErrorState,
  selectPoliticians,
  selectPoliticianCategories,
  selectPoliticianTraits,
  selectCities,
  selectRegions,
  selectPolitician,
};
