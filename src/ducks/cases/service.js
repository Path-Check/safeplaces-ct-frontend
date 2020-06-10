import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const casesService = {
  fetchCases: () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization/cases`,
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
  fetchAccessCode: () => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}access-code`,
    });
  },
  fetchPoints: ({ data }) => {
    const request = {
      method: 'POST',
      url: `${REACT_APP_API_URL}case/points`,
      data,
    };

    return axios(request);
  },
  fetchMultiPoints: ({ data }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}cases/points`,
      data,
    });
  },
  deleteCase: ({ caseId }) => {
    console.log({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}case`,
      data: {
        caseId,
      },
    });

    return axios({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}case`,
      data: {
        caseId,
      },
    });
  },
  publishCases: ({ caseIds }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}cases/publish`,
      data: {
        caseIds,
      },
    });
  },
  stageCase: ({ caseId }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/stage`,
      data: {
        caseId,
      },
    });
  },
  updateExternalCaseId: async ({ caseId, externalId }) => {
    const res = await axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}case`,
      data: {
        caseId,
        externalId,
      },
    });
    return res;
  },
};

export default casesService;
