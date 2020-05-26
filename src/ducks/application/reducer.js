import applicationTypes from './types';

const initialState = {
  status: 'IDLE',
  notification: null,
};

export default function reducer(state = initialState, action) {
  console.log(state);

  switch (action.type) {
    case applicationTypes.STATUS:
      return { ...state, status: action.status };
    case applicationTypes.NOTIFICATION:
      return {
        ...state,
        notification: action.data,
      };
    default:
      return state;
  }
}
