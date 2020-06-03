const casesSelectors = {
  getStatus: state => state.status,
  getCases: state => state.cases.cases,
  getActiveCase: state => state.cases.activeCase,
};

export default casesSelectors;
