import applicationTypes from './types';

const applicationActions = {
  updateStatus: status => ({
    type: applicationTypes.STATUS,
    status,
  }),
};

export default applicationActions;
