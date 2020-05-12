import { createSlice } from '@reduxjs/toolkit';
export const CREATE = 'safeplaces/cases/CREATE';

/* const initialState = { entries: {} };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case CREATE:
      state.entries[action.id] = { id: action.id, name: 'lorem' };
      return { ...state, entries: state.entries };
    default:
      return state;
  }
} */

export default createSlice({
  name: 'cases',
  initialState: { entries: {} },
  reducers: {
    create: (state, action) => {
      state.entries[action.payload] = {
        id: action.payload,
        name: 'lorem',
      };
    },
    save: (state, action) => {
      if (state.entries[action.payload.id]) {
        state.entries[action.payload.id] = action.payload;
      }
    },
  },
});

export const getCases = state => state.cases.entries;
export const getCasesArray = state => Object.values(state.cases.entries);

export const showCurrentCase = (state, id) => state.cases.entries[id];
