import recordTypes from 'ducks/record/types';

const initialState = {
  status: '',
  error: null,
  accessCode: null,
  record: null,
};

export default function reducer(state = initialState, action) {
  console.log(action.type);
  switch (action.type) {
    case recordTypes.STATUS:
      return { ...state, status: action.status };
    case recordTypes.ADD:
      return {
        ...state,
        record: action.data,
      };
    case recordTypes.DELETE:
      return {
        ...state,
        record: null,
      };
    case recordTypes.SUCCESS:
      return {
        ...state,
        record: action.data,
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
    default:
      return state;
  }
}
