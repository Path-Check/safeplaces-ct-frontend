import { call, put, takeEvery } from 'redux-saga/effects';
import recordTypes from 'ducks/record/types';
import applicationTypes from 'ducks/application/types';

import recordsService from './service';

function* handleAdd({ data }) {
  let response;

  yield put({ type: applicationTypes.STATUS, status: 'BUSY' });

  try {
    response = yield call(recordsService.addNew, {
      data,
      orgID: 'rocket',
    });

    yield put({ type: recordTypes.SUCCESS, data: response.data });
    yield put({ type: recordTypes.STATUS, status: 'RECORD ADDED' });
    yield put({ type: applicationTypes.STATUS, status: 'IDLE' });
  } catch (error) {
    yield put({ type: applicationTypes.STATUS, status: 'IDLE' });
    yield put({ type: recordTypes.STATUS, status: 'RECORD NOT ADDED' });
    yield put({
      type: applicationTypes.NOTIFICATION,
      data: {
        title: 'Record could not be created.',
        text: 'Please contact technical support for assistance.',
      },
    });
  }
}

function* handleDeletion({ data }) {
  let response;

  yield put({ type: applicationTypes.STATUS, status: 'BUSY' });

  try {
    response = yield call(recordsService.deleteNew, {
      data,
      caseId: 14,
    });

    yield put({ type: recordTypes.SUCCESS, data: response.data });
    yield put({ type: recordTypes.STATUS, status: 'RECORD DELETED' });
    yield put({ type: applicationTypes.STATUS, status: 'IDLE' });
  } catch (error) {
    yield put({ type: applicationTypes.STATUS, status: 'IDLE' });
    yield put({ type: recordTypes.STATUS, status: 'RECORD NOT DELETED' });
    yield put({
      type: applicationTypes.NOTIFICATION,
      data: { title: 'RECORD NOT DELETED', text: 'Please try again.' },
    });
  }
}

function* enricherSaga({ data }) {
  let response;

  yield put({ type: recordTypes.STATUS, status: 'enriching record' });

  try {
    response = yield call(fetch, { data });
    yield put({ type: recordTypes.ENRICH, data: response.data });
  } catch (error) {
    yield put({ type: recordTypes.FAILURE, error: 'enrichment failed' });
  }
}

export function* enrichSaga() {
  yield takeEvery(recordTypes.SUCCESS, enricherSaga);
}

export function* addSaga() {
  yield takeEvery(recordTypes.ADD, handleAdd);
}

export function* deleteSaga() {
  yield takeEvery(recordTypes.DELETE, handleDeletion);
}
