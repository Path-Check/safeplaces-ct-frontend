export const SET = 'safeplaces/selectedPathEntry/SET';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET:
      return action.data;
    default:
      return state;
  }
}

export const addSelected = data => {
  console.log('addSelected');
  return {
    type: SET,
    data,
  };
};
