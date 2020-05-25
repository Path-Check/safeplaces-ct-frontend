import { call, put, takeEvery } from 'redux-saga/effects';
import recordTypes from 'ducks/record/types';

import { fetch } from './service';

// record is added from client side
export function* addSaga() {
  yield takeEvery(recordTypes.ADD, adderSaga);
}


// triggers async call to UI
function* adderSaga({ data }) {
  let response;

  yield put({ type: recordTypes.LOADING, loading: true });

  try {
    response = yield call(fetch, { data });
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

  yield put({ type: recordTypes.LOADING, loading: true });

  try {
    response = yield call(fetch, { data });
    yield put({ type: recordTypes.ENRICH, data: response.data });
  } catch (error) {
    yield put({ type: recordTypes.FAILURE, error });
  }
