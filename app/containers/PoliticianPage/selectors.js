import { createSelector } from 'reselect';
import dataTransformers from './dataTransformers';

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

const selectActiveCategories = () => createSelector(
  selectGlobalDomain(),
  selectPoliticianPageDomain(),
  (globalState, subState) => {
    const eventCategoryIds = subState.get('activeCategories');
    if (!globalState.get('loaded') || !eventCategoryIds.size) return null;
    window.byId = globalState.getIn(['data', 'eventCategories', 'byId']);
    return eventCategoryIds.map((active, id) => {
      if (active) return globalState.getIn(['data', 'eventCategories', 'byId', +id]);
      return null;
    }).filter((v) => v).toJS();
  }
);

const selectActiveCategoryIds = () => createSelector(
  selectPoliticianPageDomain(),
  (subState) => subState.get('activeCategories')
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

const selectChartData = () => createSelector(
  selectGlobalDomain(),
  selectPoliticianPageDomain(),
  selectEvents(),
  selectCurDateRange(),
  selectPoliticianId(),
  selectActiveCategories(),
  dataTransformers
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
  selectActiveCategories,
  selectActiveCategoryIds,
  selectEventIsLoading,
  selectCurDateRange,
  selectEvents,
  selectChartData,
};
