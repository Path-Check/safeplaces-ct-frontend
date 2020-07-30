import { call, put, takeEvery } from 'redux-saga/effects';
import usersTypes from './types';
import usersService from './service';
import applicationActions from '../application/actions';

function* createUserSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    yield call(usersService.createUser, data);
    yield put(
      applicationActions.notification({
        title: `User added`,
      }),
    );
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(applicationActions.updateStatus('IDLE'));

    const { name, response } = error;

    const message = response?.data?.message || 'Something went wrong';

    yield put(
      applicationActions.notification({ text: message, type: 'error' }),
    );
  }
}

export function* usersSaga() {
  yield takeEvery(usersTypes.CREATE_USER, createUserSaga);
}
