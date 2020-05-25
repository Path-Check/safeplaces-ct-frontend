import { call, put, select, takeEvery } from 'redux-saga/effects';
import { ADD, SUCCESS, LOAD, FAILURE } from 'ducks/loadRecords/types';

import { fetch } from './service';

// record is added from client side
export function* addSaga() {
  yield takeEvery(ADD, workerSaga);
}

// triggers async call to UI
function* workerSaga({ data }) {
  let response;

  yield put({ type: LOADING, true });

  try {
    response = yield call(fetch, { data });
    yield put({ type: SUCCESS, data: response.data });
  } catch (error) {
    yield put({ type: FAILURE, error });
  }
}
