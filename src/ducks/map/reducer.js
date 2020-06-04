import mapTypes from './types';

const initialState = {
  location: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case mapTypes.UPDATE_LOCATION:
      return {
        ...state,
        location: action.location,
      };

    default:
      return state;
  }
}
