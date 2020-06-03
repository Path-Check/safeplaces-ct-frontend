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
        points: action.points,
      };
    case pointsTypes.SELECTED_POINTS:
      return {
        ...state,
        selectedPoints: [...state.selectedPoints, ...action.data],
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
