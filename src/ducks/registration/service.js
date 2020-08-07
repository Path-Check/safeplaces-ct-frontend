import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const registrationService = {
  submitDetails: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/login`,
      data,
    });
  },
  submitAccessCode: async accessCode => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}organization`,
      data: {
        accessCode,
      },
    });
  },
};

export default registrationService;
