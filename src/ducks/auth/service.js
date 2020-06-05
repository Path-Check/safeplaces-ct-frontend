import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  getToken: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}login`,
      data,
    });
  },
  getOrganization: async token => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  getOrganizationConfig: async token => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization/configuration`,
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
  },
  login: async data => {
    let orgRes = null;
    let user = null;

    const {
      data: { token },
    } = await authService.getToken(data);

    if (token) {
      orgRes = await authService.getOrganizationConfig(token);
      if (orgRes) {
        user = orgRes ? { ...orgRes.data } : null;
      }
    }

    return { user, token };
  },
  onboarding: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}organization/configuration`,
      data,
    });
  },
};

export default authService;
