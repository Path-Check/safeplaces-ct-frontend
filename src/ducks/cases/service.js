import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const casesService = {
  fetchCases: ({ organizationId }) => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization/cases`,
      data: {
        organizationId,
      },
    });
  },
  fetchCase: ({ organizationId }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}organization/case`,
      data: {
        organizationId,
      },
    });
  },
  fetchPoints: ({ caseId }) => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}case/points`,
      data: {
        caseId,
      },
    });
  },
  fetchMultiPoints: ({ caseId }) => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}cases/points`,
      data: {
        caseId,
      },
    });
  },
  deleteCase: ({ caseId }) => {
    return axios({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}case`,
      data: {
        caseId,
      },
    });
  },
};

export default casesService;
