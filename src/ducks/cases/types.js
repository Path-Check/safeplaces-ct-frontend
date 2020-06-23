const casesTypes = {
  STATUS: 'safeplaces/cases/STATUS',
  FETCH_CASES: 'safeplaces/cases/FETCH_CASES',
  ADD_CASES: 'safeplaces/cases/ADD_CASES',
  FETCH_CASE: 'safeplaces/cases/FETCH_CASE',
  STAGE_CASE: 'safeplaces/cases/STAGE_CASE',
  SET_ACTIVE_CASE: 'safeplaces/cases/SET_ACTIVE_CASE',
  SET_ACCESS_CODE: 'safeplaces/cases/SET_ACCESS_CODE',
  LOAD_CASE_POINTS: 'safeplaces/cases/LOAD_CASE_POINTS',
  LOAD_MULTICASE_POINTS: 'safeplaces/cases/LOAD_MULTICASE_POINTS',
  ENRICH_CASE: 'safeplaces/cases/ENRICH_CASE',
  DELETE_CASE: 'safeplaces/cases/DELETE_CASE',
  PUBLISH_CASES: 'safeplaces/cases/PUBLISH_CASES',
  CHECK_CASE_GPS_DATA: 'safeplaces/cases/CHECK_CASE_GPS_DATA',
  SET_EXTERNAL_ID: 'safeplaces/cases/SET_EXTERNAL_ID',
  externalID: {
    REQUEST: 'safeplaces/cases/REQUEST_UPDATE_EXTERNAL_ID',
    SUCCESS: 'safeplaces/cases/SUCCESS_UPDATE_EXTERNAL_ID',
    FAILURE: 'safeplaces/cases/FAILURE_UPDATE_EXTERNAL_ID',
  },
};

export default casesTypes;
