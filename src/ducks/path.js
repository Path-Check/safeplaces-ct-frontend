import { v4 } from 'uuid';
export const IMPORT = 'safeplaces/path/IMPORT';
export const REMOVE_ENTRY = 'safeplaces/path/REMOVE_ENTRY';
export const EDIT_ENTRY = 'safeplaces/path/EDIT_ENTRY';
export const ADD_ENTRY = 'safeplaces/path/ADD_ENTRY';

const initialState = { points: [] };

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case IMPORT:
      action.data.points = {};
      action.data.forEach(element => {
        // todo: check sanity here of time, verify it
        element.time = Number(element.time);
        action.data.points[v4()] = element;
      });
      delete action.data.concern_points;
      return { ...state, points: action.data };

    case REMOVE_ENTRY: {
      const points = state.points.filter(e => e.time !== action.data);
      return { ...state, points: points };
    }
    case EDIT_ENTRY: {
      const newPoints = state.points;
      if (action.id !== 'new') {
        newPoints[action.id] = action.data;
      } else {
        newPoints[v4()] = action.data;
      }

      return { ...state, points: newPoints };
    }
    case ADD_ENTRY: {
      const pointsAdd = state.points;
      pointsAdd.push({ latitude: 0, longitude: 0, time: 2132321 });
      return { ...state, points: pointsAdd };
    }
    default:
      return state;
  }
}

export const editPathEntry = (data, id) => {
  return {
    type: EDIT_ENTRY,
    data,
    id,
  };
};

export const removePathEntry = data => {
  return {
    type: REMOVE_ENTRY,
    data,
  };
};

export const addPathEntry = data => {
  return {
    type: ADD_ENTRY,
    data,
  };
};

export const importPath = data => {
  return {
    type: IMPORT,
    data,
  };
};
