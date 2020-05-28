import casesTypes from 'ducks/cases/types';

const initialState = {
  activeCase: null,
  cases: null,
  status: '',
  error: null,
  record: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case casesTypes.STATUS:
      return { ...state, status: action.status };
    case casesTypes.ADD_CASES:
      return {
        ...state,
        cases: action.data.cases,
      };
    case casesTypes.ADD_CASE:
      return {
        ...state,
        activeCase: action.data,
      };
    case casesTypes.SET_ACTIVE_CASE:
      return {
        ...state,
        activeCase: action.data,
      };
    case casesTypes.ENRICH_CASE: {
      return {
        ...state,
        record: {
          ...state.record,
          points: action.data,
        },
        code: null,
      };
    }
    default:
      return state;
  }
}
