import { createSelector } from 'reselect';

/**
 * Direct selector to the editorPage state domain
 */
const selectPoliticianPageDomain = () => (state) => state.get('politicianPage');

const selectGlobalDomain = () => (state) => state.get('global');

/**
 * Other specific selectors
 */

const selectPolitician = () => createSelector(
  selectGlobalDomain(),
  selectPoliticianPageDomain(),
  (globalState, subState) => {
    const politicianId = subState.get('activePolitician');
    if (!globalState.get('loaded') || !politicianId) return null;
    return globalState.getIn(['data', 'politicians', 'byId', politicianId]).toJS();
  }
);

const selectPoliticianId = () => createSelector(
  selectPoliticianPageDomain(),
  (subState) => subState.get('activePolitician')
);

const selectCurDateRange = () => createSelector(
  selectPoliticianPageDomain(),
  (subState) => subState.get('curDateRange').toJS()
);

const selectEventIsLoading = () => createSelector(
  selectPoliticianPageDomain(),
  (subState) => subState.getIn(['events', 'loading'])
);

const selectEvents = () => createSelector(
  selectPoliticianPageDomain(),
  (subState) => subState.get('events').toJS()
);


/**
 * Default selector used by EditorPage
 */

const selectPoliticianPage = () => createSelector(
  selectPoliticianPageDomain(),
  (substate) => substate.toJS()
);

export default selectPoliticianPage;
export {
  selectPoliticianPageDomain,
  selectPolitician,
  selectPoliticianId,
  selectEventIsLoading,
  selectCurDateRange,
  selectEvents,
};
