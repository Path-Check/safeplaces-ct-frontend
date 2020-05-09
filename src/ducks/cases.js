import { v4 } from 'uuid';
export const CREATE = 'safeplaces/cases/CREATE';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      state[action.id] = { hallo: 'du' };
      return state;
    default:
      return state;
  }
}

export const createCase = data => {
  return {
    type: CREATE,
    data,
    id: v4(),
  };
};

export const showCases = state => state.cases;
