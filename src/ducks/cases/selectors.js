const casesSelectors = {
  getStatus: state => state.status,
  getCases: state => state.cases.cases,
  getActiveCases: state => state.cases.activeCases,
  getAccessCode: state => state.cases.accessCode,
  getExternalId: state => state.cases.externalId,
};

export default casesSelectors;
