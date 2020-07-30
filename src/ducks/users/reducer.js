import usersTypes from './types';

const { CREATE_USER } = usersTypes;

const initialState = {};

export default function reducer(state = initialState, action) {
  const { type, data, error } = action;
  switch (type) {
    case CREATE_USER:
      return {
        ...state,
      };
    default:
      return state;
  }
}
