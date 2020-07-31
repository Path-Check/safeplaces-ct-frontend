import { call, put, takeEvery } from 'redux-saga/effects';
import usersTypes from './types';
import usersService from './service';
import applicationActions from '../application/actions';
import { errorHandlerSaga } from '../index';
import usersActions from './actions';

function* createUserSaga({ data }) {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    yield call(usersService.createUser, data);
    yield put(usersActions.createUserSuccess(data));
    yield put(applicationActions.notification({ title: `User added` }));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield call(errorHandlerSaga, error);
  }
}

function* getAllUsersSaga() {
  try {
    yield put(applicationActions.updateStatus('BUSY'));
    const res = yield call(usersService.getAllUsers);
    yield put(usersActions.getAllUsersSuccess(res.data));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield call(errorHandlerSaga, error);
  }
}

export function* usersSaga() {
  yield takeEvery(usersTypes.GET_ALL_USERS_REQUEST, getAllUsersSaga);
  yield takeEvery(usersTypes.CREATE_USER_REQUEST, createUserSaga);
}
