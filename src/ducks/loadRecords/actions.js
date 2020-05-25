import { LOAD } from 'ducks/loadRecords/types';

export const loadRecords = data => {
  return {
    type: LOAD,
    data,
  };
};
