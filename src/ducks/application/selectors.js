import { createSelector } from 'reselect';

const appStoreSelector = state => state.application;

export const getActivePoint = createSelector(appStoreSelector, appStore => {
  return appStore.activePoint;
});

const applicationSelectors = {
  getStatus: state => state.application.status,
  getActivePoint,
  getNotification: state => state.application.notification,
  getRenderEditor: state => state.application.renderEditor,
  getMode: state => state.application.mode,
  getNewCase: state => state.application.newCase,
  getTooltips: state => state.application.tooltips,
};

export default applicationSelectors;
