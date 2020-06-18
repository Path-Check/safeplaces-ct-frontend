import pointsTypes from './types';

const initialState = {
  points: [],
  activePoint: null,
  dateRange: [],
  singleDate: null,
  useDurationFilter: false,
  duration: null,
};

export default function reducer(state = initialState, action) {
  const { type, data, points, id } = action;
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
    case pointsTypes.SET_FILTERS:
      return {
        ...state,
        ...data,
      };
    case pointsTypes.CLEAR_FILTERS:
      return {
        ...state,
        useDurationFilter: initialState.useDurationFilter,
        duration: initialState.duration,
      };
    case pointsTypes.CLEAR_FILTERS:
      return {
        ...state,
        useDurationFilter: initialState.useDurationFilter,
        duration: initialState.duration,
      };
    case pointsTypes.HIDE_POINT:
      return {
        ...state,
        points: state.points.map(point => point.id === id ? { ...point, hidden: true } : point)
      };
    default:
      return state;
  }
}
