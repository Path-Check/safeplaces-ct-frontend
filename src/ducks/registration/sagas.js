import { call, put, takeEvery } from 'redux-saga/effects';
import { push } from 'connected-react-router';

import registrationService from './service';
import registrationActions from './actions';
import registrationTypes from './types';
import applicationActions from 'ducks/application/actions';

function* submitPersonalDetails({ data }) {
  console.log(data);
  yield put(registrationActions.setRegisrationStage(2));
  // try {
  //   const response = yield call(registrationService.submitDetails, data);
  // } catch (error) {
  //   yield put(
  //     applicationActions.notification({
  //       text: 'Unable to verify access code',
  //       type: 'error',
  //     }),
  //   );
  // }
}

function* submitAccessCode({ accessCode }) {
  yield put(push('/login'));
  // try {
  //   const response = yield call(
  //     registrationService.submitAccessCode,
  //     accessCode,
  //   );
  //   yield put(push('/login'));
  // } catch (error) {
  //   yield put(
  //     applicationActions.notification({
  //       text: 'Unable to verify access code',
  //       type: 'error',
  //     }),
  //   );
  // }
}

export function* registrationSagas() {
  yield takeEvery(registrationTypes.SUBMIT_INFORMATION, submitPersonalDetails);
  yield takeEvery(registrationTypes.SUBMIT_ACCESS_CODE, submitAccessCode);
}
