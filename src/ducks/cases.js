import { createSlice } from '@reduxjs/toolkit';

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
