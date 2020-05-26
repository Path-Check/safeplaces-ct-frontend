import authTypes from './types';

const initialState = {
  token: undefined,
  currentUser: undefined,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case authTypes.REQUEST:
      return { ...state, fetching: true, error: null };
    case authTypes.SUCCESS:
      return {
        ...state,
        currentUser: action.data.user,
        token: action.data.token,
        fetching: false,
      };
    case authTypes.FAILURE:
      return {
        ...state,
        fetching: false,
        currentUser: undefined,
        error: action.error,
        errorResponse: action.error.response,
      };
    // case "LOGIN":
    // var salt = bcryptjs.genSaltSync(10);
    // var hash = bcryptjs.hashSync("B4c0//", salt);
    // action.data.password = action.password;
    // case 'LOGIN_LOCAL':
    //   const newLogin = state;
    //   newLogin.user = state.localAuth[action.data];
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
