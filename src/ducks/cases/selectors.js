const casesSelectors = {
  getStatus: state => state.status,
  getCases: state => state.cases.cases,
  getActiveCase: state => state.cases.activeCase,
  getAccessCode: state => state.cases.accessCode,
};

export default casesSelectors;
