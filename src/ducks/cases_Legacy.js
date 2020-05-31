import { createSlice } from '@reduxjs/toolkit';
import { v4 } from 'uuid';
import { StaticRouter } from 'react-router/cjs/react-router.min';

export default createSlice({
  name: 'cases',
  initialState: { currentCase: undefined, entries: {} },
  reducers: {
    create: (state, action) => {
      state.entries[action.payload] = {
        id: action.payload,
        points: {},
      };
    },
    editEntry: (state, action) => {
      state.entries[state.currentCase].points[action.payload.id] = {
        ...state.entries[state.currentCase].points[action.payload.id],
        ...action.payload.values,
      };
    },
    setCurrentCase: (state, action) => ({
      ...state,
      currentCase: action.payload,
    }),
    editMeta: (state, action) => {
      state.entries[state.currentCase] = {
        ...state.entries[state.currentCase],
        ...action.payload,
      };
      return state;
    },
    removeEntry: (state, action) => {
      if (state.entries[state.currentCase].points[action.payload])
        state.entries[state.currentCase].points[action.payload] = {
          ...state.entries[state.currentCase].points[action.payload],
          trash: true,
        };
    },
    removeEntries: (state, action) => {
      const newState = action.payload.map(
        e =>
          (state.entries[state.currentCase].points[e] = {
            ...state.entries[state.currentCase].points[e],
            trash: true,
          }),
      );
      state.entries[state.currentCase].points = {
        ...newState,
      };
    },
  },
});

export const getCases = state => state.cases.entries;
export const getCasesArray = state => Object.values(state.cases.entries);
export const showCurrentCase = (state, id) => state.cases.entries[id];
