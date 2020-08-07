import { call, put, takeEvery } from 'redux-saga/effects';
import authTypes from './types';
import authService from './service';
import authActions from './actions';
import { push } from 'connected-react-router';
import applicationActions from '../application/actions';
import { applicationStates } from 'types/applicationStates';

function* authenticateSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus(applicationStates.BUSY));
    const response = yield call(authService.login, data);
    yield put(authActions.loginSuccess(response));
  } catch (error) {
    yield put(authActions.loginFailure(error));

    const { name, response } = error;

    const message = response?.data?.message || 'Something went wrong';

    yield put(
      applicationActions.notification({ text: message, type: 'error' }),
    );
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

function* logoutSaga() {
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
      name,
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

function* forgotPasswordSaga({ emailAddress }) {
  yield put(
    applicationActions.updateStatus(applicationStates.REQUEST_PASSWORD_LINK),
  );

  try {
    const response = yield call(authService.forgotPassword, emailAddress);
    yield put(
      applicationActions.notification({
        text: `If ${emailAddress} exists in the database a password reset email will shortly appear in your inbox.`,
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

function* resetPasswordSaga({ password, passwordConfirmation }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  try {
    const response = yield call(authService.resetPassword, password);

    yield put(push('/login'));
    yield put(
      applicationActions.notification({
        text: `Your password has been reset.`,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        type: 'error',
        text: 'Something went wrong. Please try again.',
      }),
    );
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
