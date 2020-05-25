import recordTypes from 'ducks/record/types';

export const addRecord = data => {
  return {
    type: recordTypes.ADD,
    data,
  };
};
