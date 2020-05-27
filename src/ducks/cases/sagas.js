import { all, call, put, takeEvery } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';
import casesTypes from 'ducks/cases/types';
import casesActions from 'ducks/cases/actions';
import casesService from './service';

function* addCases({ data }) {
  let response;

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchCases, {
      data,
      orgID: 'rocket',
    });

    yield put(casesActions.addCases(response.data));
    yield put(applicationActions.updateStatus('CASES ADDED'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Cases could not be retrieved.',
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* addCasesSaga() {
  yield takeEvery(casesTypes.FETCH_CASES, addCases);
}

function* addCase() {
  let response;
  console.log('here');

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchCase, {
      orgID: 'rocket',
    });

    yield put(casesActions.setCase(response.data));

    if (response.data.authCode) {
      yield put(casesActions.enrichCase());
    }

    yield put(applicationActions.updateStatus('CASE FETCHED'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Record could not be created.',
        text: 'Please contact technical support for assistance.',
      }),
    );
  }
}

function* loadCasePoints({ activeCase }) {
  let response;

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchPoints, {
      caseId: activeCase.caseId,
    });

    const enrichedCase = {
      ...activeCase,
      points: response.data.concernPoints,
    };

    yield put(casesActions.setCase(enrichedCase));

    yield put(applicationActions.updateStatus('CASE ACTIVE'));
  } catch (error) {
    yield put(casesActions.setCase(activeCase));
    yield put(
      applicationActions.notification({
        title: 'Unable to retrieve location data.',
        text: 'Please contact technical support for assistance.',
      }),
    );
  }
}

function* loadCasePointsSaga(data) {
  yield takeEvery(casesTypes.LOAD_CASE_POINTS, loadCasePoints);
}

function* addCaseSaga() {
  yield takeEvery(casesTypes.FETCH_CASE, addCase);
}

export default function* casesSagas() {
  return yield all([addCaseSaga(), addCasesSaga(), loadCasePointsSaga()]);
}
