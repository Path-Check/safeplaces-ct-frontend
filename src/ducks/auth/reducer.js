import authTypes from './types';
import registrationTypes from '../registration/types';

const { login, onboarding, logout } = authTypes;

const initialState = {
  token: undefined,
  currentOrg: undefined,
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
    case registrationTypes.MFA_STARTED:
      return {
        ...state,
        fetching: false,
      };
    case login.SUCCESS:
      return {
        ...state,
        currentOrg: data.organization,
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
        currentOrg: {
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
    case logout.REQUEST:
      return initialState;
    default:
      return state;
  }
}
