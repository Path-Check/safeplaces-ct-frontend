import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';

function* authenticateSaga({ data }) {
  try {
    const response = yield call(authService.login, { data });
    yield put({ type: authTypes.SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: authTypes.FAILURE, error });
  }
}

export function* loginSaga() {
  yield takeEvery(authTypes.REQUEST, authenticateSaga);
}
