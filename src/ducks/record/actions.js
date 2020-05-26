import recordTypes from 'ducks/record/types';

const recordActions = {
  addRecord: data => ({
    type: recordTypes.ADD,
  }),
  success: data => ({
    type: recordTypes.SUCCESS,
    data,
  }),
  previewRecord: () => ({
    type: recordTypes.STATUS,
    status: 'PREVIEW_RECORD',
  }),
  updateStatus: status => ({
    type: recordTypes.STATUS,
    status,
  }),
  clearStatus: () => ({
    type: recordTypes.STATUS,
    status: '',
  }),
};

export default recordActions;
