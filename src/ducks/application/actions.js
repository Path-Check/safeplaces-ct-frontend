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
};

export default applicationActions;
