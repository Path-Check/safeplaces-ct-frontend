/* eslint-disable no-case-declarations */
import {
  ADD_TRACK,
  DELETE_TRACK_ENTRY,
  MOVE_TRACK_ENTRY,
  EDIT_TRACK_ENTRY,
  ADD_TRACK_ENTRY,
} from '../../constants/ActionTypes';
import { v4 } from 'uuid';

import arrayMove from 'array-move';

const initialState = { points: [] };

export default function tracks(state = initialState, action) {
  switch (action.type) {
    case ADD_TRACK:
      action.data.points = {};
      action.data.forEach(element => {
        // todo: check sanity here of time, verify it
        element.time = Number(element.time);
        action.data.points[v4()] = element;
      });
      return { ...state, points: action.data };

    case DELETE_TRACK_ENTRY:
      const concernPoints = state.points.filter(e => e.time !== action.data);
      return {
        ...state,
        points: concernPoints,
      };

    case EDIT_TRACK_ENTRY:
      const newPoints = state.points;
      if (action.id !== 'new') {
        newPoints[action.id] = action.data;
      } else {
        newPoints[v4()] = action.data;
      }

      return {
        ...state,
        points: newPoints,
      };

    case MOVE_TRACK_ENTRY:
      const findIndex = state.findIndex(e => e.time !== action.time);
      const points = arrayMove(
        state.points,
        findIndex,
        findIndex + action.difference,
      );
      return {
        ...state,
        points: points,
      };

    case ADD_TRACK_ENTRY:
      const pointsAdd = state.points;
      pointsAdd.push({
        latitude: 0,
        longitude: 0,
        time: 2132321,
      });
      return {
        ...state,
        points: pointsAdd,
      };

    default:
      return state;
  }
}

export const editTrackEntry = (data, id) => {
  return {
    type: EDIT_TRACK_ENTRY,
    data,
    id,
  };
};

export const deleteTrackEntry = data => {
  return {
    type: DELETE_TRACK_ENTRY,
    data,
  };
};

export const addTrackEntry = data => {
  return {
    type: ADD_TRACK_ENTRY,
    data,
  };
};

export const addTrack = data => {
  return {
    type: ADD_TRACK,
    data,
  };
};
