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
      };
    case login.FAILURE:
    case onboarding.FAILURE:
      return {
        ...state,
        fetching: false,
        error: error,
        errorResponse: error.message,
      };
    // case "LOGIN":
    // var salt = bcryptjs.genSaltSync(10);
    // var hash = bcryptjs.hashSync("B4c0//", salt);
    // data.password = password;
    // case 'LOGIN_LOCAL':
    //   const newLogin = state;
    //   newLogin.user = state.localAuth[data];
    //   return {
    //     newLogin,
    //   };
    // case 'LOGOUT_LOCAL':
    //   const newAuth = state;
    //   delete newAuth.user;
    //   return newAuth;
    // case 'LOGOUT':
    //   return initialState;
    default:
      return state;
  }
}
