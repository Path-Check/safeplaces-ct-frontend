import applicationTypes from './types';

const applicationActions = {
  updateStatus: status => ({
    type: applicationTypes.STATUS,
    status,
  }),
  notification: data => ({
    type: applicationTypes.NOTIFICATION,
    data,
  }),
  removeNotification: () => ({
    type: applicationTypes.NOTIFICATION,
    data: null,
  }),
  setActivePoint: data => ({
    type: applicationTypes.ACTIVE_POINT,
    data,
  }),
  renderEditor: boolean => ({
    type: applicationTypes.EDITOR_VIEW,
    renderEditor: boolean,
  }),
  setMode: mode => ({
    type: applicationTypes.MODE,
    mode,
  }),
  newCase: newCase => ({
    type: applicationTypes.NEW_CASE,
    newCase,
  }),
};

export default applicationActions;
