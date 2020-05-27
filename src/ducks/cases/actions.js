import casesTypes from 'ducks/cases/types';

const casesActions = {
  status: () => ({
    type: casesTypes.STATUS,
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
  setCase: data => ({
    type: casesTypes.SET_ACTIVE_CASE,
    data,
  }),
  loadCasePoints: activeCase => ({
    type: casesTypes.LOAD_CASE_POINTS,
    activeCase,
  }),
  enrichCase: data => ({
    type: casesTypes.ENRICH_CASE,
    data,
  }),
};

export default casesActions;
