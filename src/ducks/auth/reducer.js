import authTypes from './types';

const { login, onboarding } = authTypes;

const initialState = {
  token: undefined,
  currentUser: undefined,
  error: null,
};

export default function reducer(state = initialState, action) {
  const { type, data, error } = action;
  switch (type) {
    case login.REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case login.SUCCESS:
      return {
        ...state,
        currentUser: data.user,
        token: data.token,
        fetching: false,
      };
    case onboarding.REQUEST:
      return {
        ...state,
        fetching: true,
      };
    case onboarding.SUCCESS:
      return {
        ...state,
        fetching: false,
        currentUser: {
          ...data,
        },
      };
    case login.FAILURE:
    case onboarding.FAILURE:
      return {
        ...state,
        fetching: false,
        error: error,
        errorResponse: error.message,
      };
    case login.LOGOUT:
      return initialState;
    default:
      return state;
  }
}
