import { call, put, takeEvery } from 'redux-saga/effects';
import recordTypes from 'ducks/record/types';

import { fetch } from './service';

export function* addSaga() {
  yield takeEvery(recordTypes.ADD, adderSaga);
}

function* adderSaga({ data }) {
  let response;

  yield put({ type: recordTypes.STATUS, status: 'adding record' });

  try {
    response = yield call(fetch, { data });
    yield put({ type: recordTypes.STATUS, status: 'record added' });
    yield put({ type: recordTypes.SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: recordTypes.FAILURE, error });
  }
}

export function* enrichSaga() {
  yield takeEvery(recordTypes.SUCCESS, enricherSaga);
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
