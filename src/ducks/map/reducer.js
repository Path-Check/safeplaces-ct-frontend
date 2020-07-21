import mapTypes from './types';

const initialState = {
  location: null,
  locationSelect: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case mapTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          ...action.location,
        },
      };
    case mapTypes.LOCATION_SELECT:
      return {
        ...state,
        locationSelect: action.locationSelect,
      };
    case mapTypes.LOCATION_RESET:
      return {
        ...state,
        location: null,
      };
    default:
      return state;
  }
}
