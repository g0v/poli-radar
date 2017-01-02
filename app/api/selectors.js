import { createSelector } from 'reselect';

/**
 * Direct selector to the languageToggle state domain
 */
const selectApi = () => (state) => state.get('api');

/**
 * Select the language locale
 */

const selectStatus = () => createSelector(
  selectApi(),
  (apiState) => apiState.get('status').toJS()
);

const selectData = () => createSelector(
  selectApi(),
  (apiState) => apiState.get('data').toJS()
);

export {
  selectApi,
  selectStatus,
  selectData,
};
