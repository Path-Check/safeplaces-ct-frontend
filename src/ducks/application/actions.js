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
  renderEditor: boolean => ({
    type: applicationTypes.EDITOR_VIEW,
    renderEditor: boolean,
  }),
  setMode: mode => ({
    type: applicationTypes.MODE,
    mode,
  }),
};

export default applicationActions;
