/* eslint-disable no-case-declarations */
import { call, put, select, takeEvery } from 'redux-saga/effects';
import axios from 'axios';
import { getSettingsApi } from 'ducks/settingsApi';

export const REQUEST = 'schoolconnect/auth/REQUEST_LOGIN';
export const SUCCESS = 'schoolconnect/auth/SUCCESS_LOGIN';
export const FAILURE = 'schoolconnect/auth/FAILURE_LOGIN';

const initialState = { token: undefined, currentUser: undefined };

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case REQUEST:
      return { ...state, fetching: true, error: null };
    case SUCCESS:
      return {
        ...state,
        currentUser: action.data.user,
        token: action.data.token,
        fetching: false,
      };
    case FAILURE:
      return {
        ...state,
        fetching: false,
        currentUser: undefined,
        error: action.error,
        errorResponse: action.error.response,
      };
    /* case "LOGIN":
      //var salt = bcryptjs.genSaltSync(10);
      //var hash = bcryptjs.hashSync("B4c0//", salt);
      //action.data.password = action.password; */
    case 'LOGIN_LOCAL':
      const newLogin = state;
      newLogin.user = state.localAuth[action.data];
      return {
        newLogin,
      };
    case 'LOGOUT_LOCAL':
      const newAuth = state;
      delete newAuth.user;
      return newAuth;
    case 'LOGOUT':
      return initialState;
    default:
      return state;
  }
}

export const requestLogin = data => ({
  type: REQUEST,
  data,
});

export const getToken = state => state.auth.token;
export const getCurrentUser = state => state.auth.currentUser;
export const getLoginState = state => {
  return {
    fetching: state.auth.fetching,
    error: state.auth.error,
    errorResponse: state.auth.errorResponse,
  };
};

export function* loginSaga() {
  yield takeEvery(REQUEST, workerSaga);
}

function fetchSaga({ data, settingsApi }) {
  const url = `${settingsApi.apiurl}/login/`;
  return axios({
    method: 'POST',
    url: url,
    data: data,
  });
}

function* workerSaga({ data }) {
  var response;
  const settingsApi = yield select(getSettingsApi);
  try {
    response = yield call(fetchSaga, { data, settingsApi });
    yield put({ type: SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: FAILURE, error });
  }
}
