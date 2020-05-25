import { call, put, select, takeEvery } from 'redux-saga/effects';
import { SUCCESS, LOAD, FAILURE } from 'ducks/loadRecords/types';

import { fetch } from './service';

export function* loadSaga() {
  yield takeEvery(LOAD, workerSaga);
}

function* workerSaga({ data }) {
  let response;

  try {
    response = yield call(fetch, { data });
    yield put({ type: SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: FAILURE, error });
  }
}
