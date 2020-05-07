import { v4 } from 'uuid';
export const ADD = 'safeplaces/cases/ADD';

export default function tracks(state = {}, action) {
  switch (action.type) {
    case ADD:
      state[v4()] = action.data;
      return state;
    default:
      return state;
  }
}

export const addPatient = data => {
  return {
    type: ADD,
    data,
  };
};

export const showPatients = state => state.cases;
