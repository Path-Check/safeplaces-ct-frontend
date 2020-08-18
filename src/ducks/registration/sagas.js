import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import registrationService from './service';
import registrationActions from './actions';
import registrationTypes from './types';
import applicationActions from 'ducks/application/actions';
import authActions from '../auth/actions';

function* submitPersonalDetails({ data }) {
  try {
    yield call(registrationService.submitDetails, data);
    yield put(authActions.logout());
    yield put(push('/login'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        text: 'Unable to verify access code',
        type: 'error',
      }),
    );
  }
}

function* submitPhoneSaga({ data }) {
  try {
    const response = yield call(registrationService.submitPhoneNumber, data);
    yield put(
      registrationActions.phoneSent({
        ...response.data,
        phoneNumber: data.phone_number,
      }),
    );
    yield put(push('/verify'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        text: 'Something went wrong',
        type: 'error',
      }),
    );
  }
}

function* submitAccessCode({ data }) {
  try {
    yield call(registrationService.submitAccessCode, data);
    yield put(authActions.logout());
  } catch (error) {
    yield put(
      applicationActions.notification({
        text: 'Unable to verify access code',
        type: 'error',
      }),
    );
  }
}

function* removeMfaSaga({ data }) {
  try {
    yield call(registrationService.submitAccessCode, data);
    yield put(applicationActions.notification({ text: 'MFA Removed' }));
  } catch (error) {
    yield put(
      applicationActions.notification({
        text: 'Something went wrong',
        type: 'error',
      }),
    );
  }
}

export function* registrationSagas() {
  yield takeEvery(registrationTypes.REMOVE_MFA, removeMfaSaga);
  yield takeEvery(registrationTypes.SUBMIT_PHONE, submitPhoneSaga);
  yield takeEvery(registrationTypes.SUBMIT_INFORMATION, submitPersonalDetails);
  yield takeEvery(registrationTypes.SUBMIT_ACCESS_CODE, submitAccessCode);
}
