import { call, put, select, takeEvery } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';

import casesTypes from 'ducks/cases/types';
import casesActions from 'ducks/cases/actions';
import casesService from './service';
import casesSelectors from 'ducks/cases/selectors';
import authSelectors from '../auth/selectors';
import pointsActions from 'ducks/points/actions';

function* addCases({ data }) {
  const { id: organizationId } = yield select(authSelectors.getCurrentUser);

  console.log(data);

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    const response = yield call(casesService.fetchCases, {
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

  const { id: organizationId } = yield select(authSelectors.getCurrentUser);

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    response = yield call(casesService.fetchCase, {
      organizationId,
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

function* loadCasePoints({ type, caseId }) {
  yield put(applicationActions.updateStatus('BUSY'));

  try {
    const response = yield call(casesService.fetchPoints, {
      caseId,
    });

    yield put(casesActions.setCase(caseId));
    yield put(pointsActions.updatePoints(response.data.concernPoints));
    yield put(applicationActions.renderEditor(true));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(casesActions.setCase(caseId));

    yield put(applicationActions.updateStatus('CASES ADDED'));
    yield put(
      applicationActions.notification({
        title: 'Unable to retrieve location data.',
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* checkCaseGPSDataSaga() {
  const activeCase = yield select(casesSelectors.getActiveCase);
  try {
    yield call(loadCasePoints, { activeCase });
  } catch (e) {
    yield put(
      applicationActions.notification({
        title: 'Data is not available yet.',
        text:
          'Please check again in a moment. If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* deleteCase() {
  const activeCase = yield select(casesSelectors.getActiveCase);

  console.log('delete');

  try {
    yield call(casesService.deleteCase, {
      caseId: activeCase.caseId,
    });
    yield put(casesActions.setCase(null));
    yield put(applicationActions.updateStatus('IDLE'));
    yield put(
      applicationActions.notification({
        title: 'Case Deleted',
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to delete case',
        text: 'Please try again.',
      }),
    );
  }
}

export default function* casesSagas() {
  yield takeEvery(casesTypes.FETCH_CASE, addCase);
  yield takeEvery(casesTypes.FETCH_CASES, addCases);
  yield takeEvery(casesTypes.DELETE_CASE, deleteCase);
  yield takeEvery(casesTypes.LOAD_CASE_POINTS, loadCasePoints);
  yield takeEvery(casesTypes.LOAD_MULTICASE_POINTS, loadCasePoints);
  yield takeEvery(casesTypes.CHECK_CASE_GPS_DATA, checkCaseGPSDataSaga);
}
