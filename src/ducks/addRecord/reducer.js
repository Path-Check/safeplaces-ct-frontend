import { ADD, LOAD, SUCCESS, FAILURE } from 'ducks/records/types';

const initialState = {
  loading: false,
  error: null,
  accessCode: null,
  record: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case ADD:
      return {
        ...state,
        record: {
          ...action.data,
        },
      };
    case SUCCESS:
      return {
        ...state,
        record: {
          ...state.record,
          points: action.data,
        },
        code: action.data.accessCode,
        loading: false,
      };
    case FAILURE:
      return {
        ...state,
        fetching: false,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
