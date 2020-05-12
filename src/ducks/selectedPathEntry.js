export const SET = 'safeplaces/selectedPathEntry/SET';
export const DELETE = 'safeplaces/selectedPathEntry/DELETE';

const initialState = [];

export default function todos(state = initialState, action) {
  switch (action.type) {
    case SET:
      return action.data;
    case DELETE:
      return state.filter(item => {
        return action.data.includes(item) === false;
      });
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

export const deleteSelected = data => {
  console.log('deleteSelected', data);
  return {
    type: DELETE,
    data,
  };
};
