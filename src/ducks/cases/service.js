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
  enrichCase: ({ accessCode, caseId }) => {
    const request = {
      method: 'POST',
      url: `${REACT_APP_API_URL}case/points/ingest`,
      data: {
        accessCode,
        caseId,
      },
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
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}case/delete`,
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
  updateExternalCaseId: ({ caseId, externalId }) => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}case`,
      data: {
        caseId,
        externalId,
      },
    });
  },
};

export default casesService;
