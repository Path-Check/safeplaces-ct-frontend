import pointsTypes from './types';

const initialState = {
  points: [],
  filterPoints: [],
  activePoint: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case pointsTypes.POINTS:
      return {
        ...state,
        points: [...state.points, ...action.data],
      };
    case pointsTypes.SELECTED_POINTS:
      return {
        ...state,
        filterPoints: [...state.filterPoints, ...action.data],
      };
    case pointsTypes.ACTIVE_POINT:
      return {
        ...state,
        activePoint: action.id,
      };
    default:
      return state;
  }
}
