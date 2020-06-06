import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';
import authActions from './actions';
import { push } from 'connected-react-router';
import applicationActions from '../application/actions';

function* authenticateSaga({ data }) {
  try {
    const response = yield call(authService.login, data);
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    const {
      name,
      response: {
        data: { message },
      },
    } = error;
    yield put(applicationActions.notification({ title: name, text: message }));
    yield put(authActions.loginFailure(error));
  }
}

function* onboardingSaga({ data }) {
  try {
    const response = yield call(authService.onboarding, data);

    yield put(
      authActions.onboardingSuccess({
        ...response.data,
      }),
    );
    yield put(push('/trace'));
  } catch (error) {
    const {
      name,
      response: {
        data: { message },
        status,
      },
    } = error;
    const text = status === 500 ? 'Something wrong happened.' : message;
    yield put(applicationActions.notification({ title: name, text }));
    yield put(authActions.onboardingFailure(error));
  }
}

export function* authSaga() {
  yield takeEvery(authTypes.login.REQUEST, authenticateSaga);
  yield takeEvery(authTypes.onboarding.REQUEST, onboardingSaga);
}
