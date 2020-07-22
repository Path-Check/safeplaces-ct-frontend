import pointsTypes from './types';
import { getDates } from 'helpers/pointsUtils';

const initialState = {
  points: [],
  activePoint: null,
  dateRange: [],
  singleDate: null,
  useDurationFilter: false,
  duration: null,
  recordIds: null,
  geometry: null,
};

export default function reducer(state = initialState, action) {
  const { type, data, points, geometry, recordIds } = action;
  switch (type) {
    case pointsTypes.POINTS:
      return {
        ...state,
        points,
      };

    case pointsTypes.SET_DATE_RANGE:
      return {
        ...state,
        dateRange: data,
        singleDate: initialState.singleDate,
      };
    case pointsTypes.SET_SINGLE_DATE:
      return {
        ...state,
        singleDate: data,
        dateRange: initialState.dateRange,
      };
    case pointsTypes.SET_GEOMETRY:
      return {
        ...state,
        geometry,
      };
    case pointsTypes.SET_FILTERS:
      return {
        ...state,
        ...data,
      };
    case pointsTypes.SET_RECORD_IDS:
      return {
        ...state,
        recordIds,
      };
    case pointsTypes.CLEAR_FILTERS:
      const dates = getDates(state.points);
      return {
        ...state,
        useDurationFilter: initialState.useDurationFilter,
        duration: initialState.duration,
        geometry: initialState.geometry,
        recordIds: initialState.recordIds,
        singleDate: initialState.singleDate,
        dateRange: [dates[0], dates[dates.length - 1]],
        points: state.points,
      };

    default:
      return state;
  }
}
