import { all, call, put, takeEvery, select } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';
import casesTypes from 'ducks/cases/types';
import casesActions from 'ducks/cases/actions';
import casesService from './service';
import casesSelectors from 'ducks/cases/selectors';

function* addCases({ data }) {
  let response;
  const organizationId = ''; // TODO : retrieve from store

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchCases, {
      organizationId,
    });

    yield put(casesActions.addCases(response.data));
    yield put(applicationActions.updateStatus('CASES ADDED'));
  } catch (error) {
    yield put(applicationActions.updateStatus('IDLE'));
    yield put(
      applicationActions.notification({
        title: 'Cases could not be retrieved.',
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* addCase() {
  let response;

  const organizationId = ''; // TODO : retrieve from store

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchCase, {
      organizationId, // TODO : retrieve from store
    });

    yield put(casesActions.setCase(response.data));

    if (response.data.authCode) {
      yield put(casesActions.enrichCase());
    }

    yield put(applicationActions.updateStatus('CASE FETCHED'));
  } catch (error) {
    yield put(applicationActions.updateStatus('IDLE'));
    yield put(
      applicationActions.notification({
        title: 'Record could not be created.',
        text:
          'If issue persists, please contact technical support for assistance.',
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
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* deleteCase() {
  const activeCase = yield select(casesSelectors.getActiveCase);

  try {
    yield call(casesService.deleteCase, {
      caseId: activeCase.caseId,
    });
    yield put(casesActions.setCase(null));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to delete case',
        text: 'Please try again.',
      }),
    );
  }
}

function* deleteCaseSaga() {
  yield takeEvery(casesTypes.DELETE_CASE, deleteCase);
}

function* addCasesSaga() {
  yield takeEvery(casesTypes.FETCH_CASES, addCases);
}

function* loadCasePointsSaga(data) {
  yield takeEvery(casesTypes.LOAD_CASE_POINTS, loadCasePoints);
}

function* addCaseSaga() {
  yield takeEvery(casesTypes.FETCH_CASE, addCase);
}

export default function* casesSagas() {
  return yield all([
    addCaseSaga(),
    addCasesSaga(),
    loadCasePointsSaga(),
    deleteCaseSaga(),
  ]);
}
