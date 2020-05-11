export const SET = 'safeplaces/selectedPathEntry/SET';
export const DELETE_SELECTED_ENTRY = 'safeplaces/selectedPathEntry/DELETE_SELECTED_ENTRY';

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

export const deleteSelected = data => {
  console.log('deleteSelected', data);
  return {
    type: DELETE_SELECTED_ENTRY,
    data,
  };
};