import { v4 } from 'uuid';
export const IMPORT = 'safeplaces/path/IMPORT';
export const REMOVE_ENTRY = 'safeplaces/path/REMOVE_ENTRY';
export const REMOVE_ENTRIES = 'safeplaces/path/REMOVE_ENTRIES';
export const EDIT_ENTRY = 'safeplaces/path/EDIT_ENTRY';
export const ADD_ENTRY = 'safeplaces/path/ADD_ENTRY';

const initialState = { points: [] };

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case IMPORT:
      action.data.points = {};
      action.data.forEach((element, index) => {
        const id = v4();
        // todo: check sanity here of time, verify it
        //element.time = Number(element.time);
        element.id = id;
        action.data.points[id] = element;
      });
      delete action.data.concern_points;
      return { ...state, points: action.data.points };

    case REMOVE_ENTRY: {
      state.points[action.payload] = {
        ...state.points[action.payload],
        trash: true,
      };
      return { ...state };
    }
    case REMOVE_ENTRIES: {
      action.payload.map(e => {
        state.points[e] = {
          ...state.points[e],
          trash: true,
        };
      });
      state.points[action.payload] = {
        ...state.points[action.payload],
        trash: true,
      };
      return { ...state };
    }
    /*case REMOVE_ENTRY: {
      const points = state.points.filter(e => e.time !== action.data);
      return { ...state, points: points };
    }*/
    case EDIT_ENTRY: {
      /*const newPoints = state.points;
      if (action.id !== 'new') {
        newPoints[action.id] = action.data;
      } else {
        newPoints[v4()] = action.data;
      }*/
      state.points[action.payload.id] = action.payload;

      return { ...state };
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
    payload: data,
  };
};

export const removePathEntry = payload => {
  return {
    type: REMOVE_ENTRY,
    payload,
  };
};

export const removePathEntries = payload => {
  return {
    type: REMOVE_ENTRIES,
    payload,
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
