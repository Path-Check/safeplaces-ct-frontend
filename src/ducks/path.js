import { v4 } from 'uuid';
import { createSlice } from '@reduxjs/toolkit';
export default createSlice({
  name: 'path',
  initialState: { id: undefined, points: {} },
  reducers: {
    import: (state, action) => {
      var points = {};
      action.payload.forEach(element => {
        const id = v4();
        element.id = id;
        points[id] = element;
      });
      state.points = points;
      return state;
    },
    load: (state, action) => {
      const { id = v4(), points = {}, name = 'unnamed' } = action.payload;
      return { id, points, name };
    },
    editEntry: (state, action) => {
      state.points[action.payload.id] = {
        ...state.points[action.payload.id],
        ...action.payload.values,
      };
    },
    editMeta: (state, action) => ({ ...state, ...action.payload }),
    removeEntry: (state, action) => {
      if (state.points[action.payload])
        state.points[action.payload] = {
          ...state.points[action.payload],
          trash: true,
        };
    },
    removeEntries: (state, action) => {
      action.payload.map(
        e =>
          (state.points[e] = {
            ...state.points[e],
            trash: true,
          }),
      );
      state.points[action.payload] = {
        ...state.points[action.payload],
        trash: true,
      };
    },
  },
});
export const getPath = state => state.path;
