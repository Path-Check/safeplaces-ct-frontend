import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const recordsService = {
  addNew: ({ data, orgID }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}organization/${orgID}/case`,
      data: {
        orgID,
      },
    });
  },
  deleteNew: ({ data, caseId }) => {
    return axios({
      method: 'DELETE',
      url: `${REACT_APP_API_URL}case/${caseId}`,
    });
  },
};

export default recordsService;
