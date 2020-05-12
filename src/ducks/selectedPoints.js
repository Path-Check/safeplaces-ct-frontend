export const SET = 'safeplaces/selectedPoints/SET';

const initialState = [];

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case SET:
      return action.payload;
    default:
      return state;
  }
}

export const addSelected = payload => {
  return {
    type: SET,
    payload,
  };
};
