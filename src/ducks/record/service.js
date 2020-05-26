import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const recordsService = {
  addNew: ({ data, orgID }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/organiztion/${orgID}/case`,
      data: {
        orgID,
      },
    });
  },
  deleteNew: ({ data, caseId }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/case`,
      data: {
        caseId,
      },
    });
  },
};

export default recordsService;
