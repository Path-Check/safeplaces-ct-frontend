import recordTypes from 'ducks/record/types';

const recordActions = {
  addRecord: data => ({
    type: recordTypes.ADD,
  }),
  previewRecord: () => ({
    type: recordTypes.STATUS,
    status: 'PREVIEW_RECORD',
  }),
  clearStatus: () => ({
    type: recordTypes.STATUS,
    status: '',
  }),
};

export default recordActions;
