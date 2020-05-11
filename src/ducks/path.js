import { v4 } from 'uuid';
export const IMPORT = 'safeplaces/path/IMPORT';
export const REMOVE_ENTRY = 'safeplaces/path/REMOVE_ENTRY';
export const EDIT_ENTRY = 'safeplaces/path/EDIT_ENTRY';
export const ADD_ENTRY = 'safeplaces/path/ADD_ENTRY';
export const REMOVE_SELECTED_ENTRY = 'safeplaces/path/REMOVE_SELECTED_ENTRY';

const initialState = { points: [] };

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case IMPORT:
      action.data.points = [];
      action.data.forEach((element, index) => {
        // todo: check sanity here of time, verify it
        element.time = Number(element.time);
        element.id = index;
        action.data.points.push(element);
      });
      delete action.data.concern_points;
      return { ...state, points: action.data };

    case REMOVE_ENTRY: {
      const points = state.points.filter(e => e.time !== action.data);
      return { ...state, points: points };
    }
    case REMOVE_SELECTED_ENTRY: {
      const points = state.points.filter(item => {
        return action.data.includes(item) === false;
      });
      return { ...state, points: points };
    }
    case EDIT_ENTRY: {
      const newPoints = state.points;
      if (action.id !== 'new') {
        const data = newPoints.filter(item => {
          return item.id === action.id;
        })[0];
        const index = newPoints.indexOf(data);
        newPoints[index] = action.data;
        newPoints[index].id = action.id;
      } else {
        newPoints.push({ ...action.data, id: v4() });
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

export const removeSelectedPathEntry = data => {
  return {
    type: REMOVE_SELECTED_ENTRY,
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
