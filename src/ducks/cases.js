import { v4 } from 'uuid';
export const CREATE = 'safeplaces/cases/CREATE';

const initialState = { entries: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      state.entries[action.id] = { name: 'du' };
      return { ...state, entries: state.entries };
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

export const showCases = state => state.cases.entries;

export const showCurrentCase = (state, id) => state.cases.entries[id];
