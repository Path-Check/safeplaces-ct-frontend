import { LOAD, SUCCESS, FAILURE } from 'ducks/records/types';

const initialState = {
  loading: false,
  error: null,
  records: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case LOAD:
      return { ...state, loading: true };
    case SUCCESS:
      return {
        ...state,
        records: [...action.data.records],
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
