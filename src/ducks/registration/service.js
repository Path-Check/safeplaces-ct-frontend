import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const registrationService = {
  submitDetails: async data => {
    const headers = { authorization: `Bearer ${data.authorization}` };
    delete data.authorization;
    return axios({
      method: 'POST',
      headers,
      url: `${REACT_APP_API_URL}auth/register`,
      data,
    });
  },
  submitPhoneNumber: async data => {
    const headers = { authorization: `Bearer ${data.authorization}` };
    delete data.authorization;
    return axios({
      method: 'POST',
      headers,
      url: `${REACT_APP_API_URL}auth/mfa/enroll`,
      data,
    });
  },
  submitAccessCode: async data => {
    const headers = { authorization: `Bearer ${data.authorization}` };
    delete data.authorization;
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/mfa/verify`,
      headers,
      data,
    });
  },
  removeMfa: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/reset-mfa`,
      data,
    });
  },
};

export default registrationService;
