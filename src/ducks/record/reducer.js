import recordTypes from 'ducks/record/types';

const initialState = {
  status: '',
  error: null,
  accessCode: null,
  record: {},
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case recordTypes.STATUS:
      return { ...state, status: action.status };
    case recordTypes.ADD:
      return {
        ...state,
        record: action.data,
      };
    case recordTypes.SUCCESS:
      return {
        ...state,
        code: action.data.code,
        loading: false,
      };
    case recordTypes.ENRICH: {
      return {
        ...state,
        record: {
          ...state.record,
          points: action.data,
        },
        code: null,
        loading: false,
      };
    }
    case recordTypes.FAILURE:
      return {
        ...state,
        fetching: false,
        status: '',
        error: action.error,
      };
    default:
      return state;
  }
}
