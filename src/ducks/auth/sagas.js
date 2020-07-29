import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';
import authActions from './actions';
import { push } from 'connected-react-router';
import applicationActions from '../application/actions';

function* authenticateSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    const response = yield call(authService.login, data);
    yield put(authActions.loginSuccess(response));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(authActions.loginFailure(error));
    yield put(applicationActions.updateStatus('IDLE'));

    const { name, response } = error;

    const message = response?.data?.message || 'Something went wrong';

    yield put(
      applicationActions.notification({ text: message, type: 'error' }),
    );
  }
}

function* logoutSaga() {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    yield call(authService.logout);
  } catch (e) {}
  yield put(push('/login'));
  yield put(applicationActions.updateStatus('IDLE'));
}

function* onboardingSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    const response = yield call(authService.onboarding, data);

    yield put(
      authActions.onboardingSuccess({
        ...response.data,
      }),
    );
    yield put(push('/trace'));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    const {
      name,
      response: {
        data: { message },
        status,
      },
    } = error;
    const text = status === 500 ? 'Something went wrong.' : message;
    yield put(applicationActions.updateStatus('IDLE'));
    yield put(applicationActions.notification({ text }));
    yield put(authActions.onboardingFailure(error));
  }
}

export function* authSaga() {
  yield takeEvery(authTypes.login.REQUEST, authenticateSaga);
  yield takeEvery(authTypes.onboarding.REQUEST, onboardingSaga);
  yield takeEvery(authTypes.logout.REQUEST, logoutSaga);
}
