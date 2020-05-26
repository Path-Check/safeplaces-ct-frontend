import { call, put, takeEvery } from 'redux-saga/effects';

import recordTypes from 'ducks/record/types';
import recordActions from 'ducks/record/actions';
import applicationActions from 'ducks/application/actions';

import recordsService from './service';

function* handleAdd({ data }) {
  let response;

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(recordsService.addNew, {
      data,
      orgID: 'rocket',
    });

    yield put(recordActions.success(response.data));
    yield put(recordActions.updateStatus('RECORD ADDED'));

    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(applicationActions.updateStatus('IDLE'));
    yield put(recordActions.updateStatus('RECORD NOT ADDED'));
    yield put(
      applicationActions.notification({
        title: 'Record could not be created.',
        text: 'Please contact technical support for assistance.',
      }),
    );
  }
}

export function* addSaga() {
  yield takeEvery(recordTypes.ADD, handleAdd);
}
