import applicationTypes from './types';

const applicationActions = {
  updateStatus: status => ({
    type: applicationTypes.STATUS,
    status,
  }),
  removeNotification: () => ({
    type: applicationTypes.NOTIFICATION,
    data: null,
  }),
};

export default applicationActions;
