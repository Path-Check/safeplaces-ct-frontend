const recordsSelectors = {
  getStatus: state => state.records.status,
  getRecord: state => state.records.record,
  getAccessCode: state => state.records.code,
};

export default recordsSelectors;
