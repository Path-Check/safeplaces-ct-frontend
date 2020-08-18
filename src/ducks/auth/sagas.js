/* eslint-disable camelcase */
import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';
import authActions from './actions';
import { push } from 'connected-react-router';
import applicationActions from '../application/actions';
import { applicationStates } from 'types/applicationStates';
import registrationActions from '../registration/actions';

function* authenticateSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus(applicationStates.BUSY));
    const response = yield call(authService.login, data);
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    const { response: res } = error;
    if (res.data && res.data.error === 'MFARequired') {
      yield put(registrationActions.mfaStarted(res.data.mfa_token));
      yield put(push('/phone'));
      yield put(
        applicationActions.notification({ text: 'Enable 2FA to continue' }),
      );
    } else {
      yield put(authActions.loginFailure(error));
      const message =
        res.data?.message ||
        res.data?.error_description ||
        'Something went wrong';

      yield put(
        applicationActions.notification({ text: message, type: 'error' }),
      );
    }
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

export function* logoutSaga() {
  try {
    yield put(applicationActions.updateStatus(applicationStates.BUSY));
    yield call(authService.logout);
  } catch (e) {}
  yield put(push('/login'));
  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

function* onboardingSaga({ data }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));

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
      response: {
        data: { message },
        status,
      },
    } = error;
    const text = status === 500 ? 'Something went wrong.' : message;
    yield put(applicationActions.notification({ text }));
    yield put(authActions.onboardingFailure(error));
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

function* forgotPasswordSaga({ data }) {
  yield put(applicationActions.updateStatus('BUSY'));
  try {
    const res = yield call(authService.forgotPassword, data);
    yield put(
      authActions.forgotPasswordSuccess({
        id: data.id,
        redirectUrl: res.data.password_reset_url,
      }),
    );
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(
      applicationActions.notification({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      }),
    );
    yield put(
      applicationActions.updateStatus(applicationStates.FORGOT_PASSWORD),
    );
  }
}

function* resetPasswordSaga({ data }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  try {
    const response = yield call(authService.resetPassword, data);

    yield put(push('/login'));
    yield put(
      applicationActions.notification({
        text: `Your password has been reset.`,
      }),
    );
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(
      applicationActions.notification({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      }),
    );
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

export function* authSaga() {
  yield takeEvery(authTypes.login.REQUEST, authenticateSaga);
  yield takeEvery(authTypes.login.FORGOT_PASSWORD, forgotPasswordSaga);
  yield takeEvery(authTypes.login.RESET_PASSWORD, resetPasswordSaga);
  yield takeEvery(authTypes.onboarding.REQUEST, onboardingSaga);
  yield takeEvery(authTypes.logout.REQUEST, logoutSaga);
}
