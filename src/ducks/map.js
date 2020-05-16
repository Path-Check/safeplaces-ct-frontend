export const MAP_COORDINATE = 'safeplaces/selectedPoints/MAP_COORDINATE';

const initialState = {};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case MAP_COORDINATE:
      console.log(action.payload);
      return { ...state, ...{ coordinate: action.payload } };
    default:
      return state;
  }
}
export const setMapCoordinate = payload => {
  return {
    type: MAP_COORDINATE,
    payload,
  };
};
export const getClickedCoordinate = state => {
  const { coordinate } = state;
  return coordinate;
};
