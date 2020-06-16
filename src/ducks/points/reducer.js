import pointsTypes from './types';

const initialState = {
  points: [],
  filteredPoints: [],
  activePoint: null,
  dateRange: [],
  singleDate: null,
};

export default function reducer(state = initialState, action) {
  const { type, data, points } = action;
  switch (type) {
    case pointsTypes.POINTS:
      return {
        ...state,
        points,
      };
    case pointsTypes.ACTIVE_POINT:
      return {
        ...state,
        activePoint: data,
      };
    case pointsTypes.FILTER_POINTS:
      return {
        ...state,
        filteredPoints: data,
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
    default:
      return state;
  }
}
