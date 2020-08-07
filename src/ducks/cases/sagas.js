import { call, put, select, takeEvery } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';

import casesTypes from 'ducks/cases/types';
import casesActions from 'ducks/cases/actions';
import casesService from './service';
import casesSelectors from 'ducks/cases/selectors';
import authSelectors from '../auth/selectors';
import pointsActions from 'ducks/points/actions';
import { applicationStates } from 'types/applicationStates';

function* addCases({ data }) {
  try {
    yield put(applicationActions.updateStatus(applicationStates.BUSY));

    const response = yield call(casesService.fetchCases);

    if (!response.data.cases || response.data.cases.length < 1) {
      throw Error('No cases returned');
    }

    yield put(casesActions.addCases(response.data));
    yield put(applicationActions.updateStatus(applicationStates.CASES_ADDED));
  } catch (error) {
    console.error(error);

    yield put(applicationActions.updateStatus(applicationStates.IDLE));
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

  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  const { id: organizationId } = yield select(authSelectors.getCurrentOrg);

  try {
    response = yield call(casesService.fetchCase, {
      organizationId,
    });

    yield put(casesActions.setCase(response.data));

    const {
      data: { accessCode },
    } = yield call(casesService.fetchAccessCode);

    if (accessCode) {
      yield put(casesActions.setAccessCode(accessCode));
    }

    yield put(applicationActions.updateStatus(applicationStates.CASE_FETCHED));
  } catch (error) {
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
    yield put(
      applicationActions.notification({
        title: 'Record could not be created.',
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
  }
}

function* loadCasePoints({ type, cases }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  let service;
  let data;

  switch (type) {
    case casesTypes.LOAD_CASE_POINTS:
      service = 'fetchPoints';
      data = {
        caseId: cases.caseId,
      };
      break;
    case casesTypes.LOAD_MULTICASE_POINTS:
      service = 'fetchMultiPoints';
      data = {
        caseIds: cases.map(c => c.caseId),
      };
      break;
    default:
      break;
  }

  try {
    const response = yield call(casesService[service], {
      data,
    });

    yield put(casesActions.setCase(cases));
    yield put(pointsActions.updatePoints(response.data.concernPoints));
    yield put(applicationActions.renderEditor(true));
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(casesActions.setCase(cases));
    yield put(
      applicationActions.notification({
        title: 'Unable to retrieve location data.',
        text:
          'If issue persists, please contact technical support for assistance.',
      }),
    );
    yield put(applicationActions.updateStatus(applicationStates.CASES_ADDED));
  }
}

function* checkCaseGPSDataSaga() {
  const { caseId } = yield select(casesSelectors.getActiveCases);
  const accessCode = yield select(casesSelectors.getAccessCode);

  try {
    const response = yield call(casesService.enrichCase, {
      accessCode,
      caseId,
    });

    yield put(pointsActions.updatePoints(response.data.concernPoints));
    yield put(applicationActions.renderEditor(true));
    yield put(applicationActions.newCase(true));
    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (e) {
    yield put(
      applicationActions.notification({
        title: 'Unable to return data.',
        text:
          ' Please check again in a moment. If issue persists, please contact technical support for assistance.',
      }),
    );
    yield put(applicationActions.updateStatus(applicationStates.CASE_FETCHED));
  }
}

function* deleteCase() {
  const { caseId } = yield select(casesSelectors.getActiveCases);

  try {
    yield call(casesService.deleteCase, {
      caseId,
    });

    yield put(casesActions.setCase(null));

    yield put(
      applicationActions.notification({
        title: 'Case Deleted',
      }),
    );

    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to delete case',
        text: 'Please try again.',
      }),
    );
  }
}

function* publishCases() {
  const cases = yield select(casesSelectors.getActiveCases);
  const caseIds = cases.map(c => c.caseId);

  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  try {
    yield call(casesService.publishCases, {
      caseIds,
    });

    yield put({ type: 'RESET_VIEW' });

    yield put(
      applicationActions.notification({
        title: `${cases.length} record(s) have been downloaded to your API endpoint`,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.updateStatus(applicationStates.SUBMIT_FOR_PUBLISHING),
    );

    yield put(
      applicationActions.notification({
        title: 'Unable to publish case(s)',
        text: 'Please try again.',
      }),
    );
  }
}

function* stageCase() {
  const { caseId } = yield select(casesSelectors.getActiveCases);

  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  try {
    yield call(casesService.stageCase, { caseId });
    yield put(
      applicationActions.notification({
        title: `Record ${caseId} has successfully been staged for publishing.`,
      }),
    );

    yield put({
      type: 'RESET_VIEW',
    });
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to stage case for publishing, Please try again',
        text: '- if the problem persists, please seek technical support.',
      }),
    );

    yield put(applicationActions.updateStatus(applicationStates.STAGE_CASE));
  }
}

function* updateExternalId({ externalId }) {
  const { caseId } = yield select(casesSelectors.getActiveCases);
  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  try {
    const response = yield call(casesService.updateExternalCaseId, {
      caseId,
      externalId,
    });

    yield put(casesActions.setCase(response.data.case));

    yield put(
      applicationActions.notification({
        title: `${caseId}'s external ID is now set to ${externalId}.`,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: `Unable to update the external ID for ${caseId}.`,
        text: ' Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

function* setRecordId() {
  const activeCaseId = yield select(casesSelectors.getActiveCases);

  if (!activeCaseId && Array.isArray(activeCaseId)) {
    return;
  }

  const cases = yield select(casesSelectors.getCases);

  if (!cases || cases?.length < 1) {
    return;
  }

  const targetCase = cases.find(({ caseId }) => activeCaseId === caseId);

  if (!targetCase) {
    return;
  }
  yield put(casesActions.setExternalId(targetCase.externalId));
}

export default function* casesSagas() {
  yield takeEvery(casesTypes.FETCH_CASE, addCase);
  yield takeEvery(casesTypes.FETCH_CASES, addCases);
  yield takeEvery(casesTypes.DELETE_CASE, deleteCase);
  yield takeEvery(casesTypes.PUBLISH_CASES, publishCases);
  yield takeEvery(casesTypes.STAGE_CASE, stageCase);
  yield takeEvery(casesTypes.SET_ACTIVE_CASE, setRecordId);
  yield takeEvery(casesTypes.LOAD_CASE_POINTS, loadCasePoints);
  yield takeEvery(casesTypes.LOAD_MULTICASE_POINTS, loadCasePoints);
  yield takeEvery(casesTypes.CHECK_CASE_GPS_DATA, checkCaseGPSDataSaga);
  yield takeEvery(casesTypes.externalID.REQUEST, updateExternalId);
}
