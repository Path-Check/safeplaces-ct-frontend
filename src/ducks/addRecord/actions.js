import { ADD } from 'ducks/addRecord/types';

export const addRecord = data => {
  return {
    type: ADD,
    data,
  };
};
