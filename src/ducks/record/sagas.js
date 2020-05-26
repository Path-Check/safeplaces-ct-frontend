import { call, put, takeEvery, select } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';
import recordTypes from 'ducks/record/types';
import recordActions from 'ducks/record/actions';
import recordsService from './service';
import recordsSelectors from 'ducks/record/selectors';

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

function* handleDelete({ data }) {
  const record = yield select(recordsSelectors.getRecord); // <-- get the project

  try {
    yield call(recordsService.deleteNew, {
      data,
      caseId: record.id,
    });

    yield put(recordActions.updateRecord(null));
    yield put(recordActions.updateStatus('RECORD DELETED'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'RECORD NOT DELETED',
        text: 'Please try again.',
      }),
    );
  }
}

export function* addSaga() {
  yield takeEvery(recordTypes.ADD, handleAdd);
}

export function* deleteSaga() {
  yield takeEvery(recordTypes.DELETE, handleDelete);
}
