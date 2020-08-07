import casesTypes from 'ducks/cases/types';

const casesActions = {
  checkCaseGPSData: () => ({
    type: casesTypes.CHECK_CASE_GPS_DATA,
  }),
  fetchCases: () => ({
    type: casesTypes.FETCH_CASES,
  }),
  addCases: data => ({
    type: casesTypes.ADD_CASES,
    data,
  }),
  fetchCase: () => ({
    type: casesTypes.FETCH_CASE,
  }),
  setCase: caseId => ({
    type: casesTypes.SET_ACTIVE_CASE,
    caseId,
  }),
  setAccessCode: accessCode => ({
    type: casesTypes.SET_ACCESS_CODE,
    accessCode,
  }),
  loadCasePoints: cases => ({
    type: casesTypes.LOAD_CASE_POINTS,
    cases,
  }),
  loadMultiCasePoints: cases => ({
    type: casesTypes.LOAD_MULTICASE_POINTS,
    cases,
  }),
  enrichCase: data => ({
    type: casesTypes.ENRICH_CASE,
    data,
  }),
  stageCase: data => ({
    type: casesTypes.STAGE_CASE,
  }),
  deleteCase: data => ({
    type: casesTypes.DELETE_CASE,
    data,
  }),
  publishCases: () => ({
    type: casesTypes.PUBLISH_CASES,
  }),
  setExternalId: externalId => ({
    type: casesTypes.SET_EXTERNAL_ID,
    externalId,
  }),
  updExternalCaseIdRequest: externalId => ({
    type: casesTypes.externalID.REQUEST,
    externalId,
  }),
  updExternalCaseIdSuccess: externalId => ({
    type: casesTypes.externalID.SUCCESS,
    externalId,
  }),
  updExternalCaseIdFailure: error => ({
    type: casesTypes.externalID.FAILURE,
    error,
  }),
};

export default casesActions;
