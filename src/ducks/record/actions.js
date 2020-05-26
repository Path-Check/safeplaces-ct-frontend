import recordTypes from 'ducks/record/types';

const recordActions = {
  addRecord: data => ({
    type: recordTypes.ADD,
  }),
  clearNotification: () => ({
    type: recordTypes.NOTIFICATION,
    data: {},
  }),
};

export default recordActions;
