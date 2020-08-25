import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  getToken: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/login`,
      data,
    });
  },
  getOrganization: async () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization`,
    });
  },
  getOrganizationConfig: async () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}organization/configuration`,
    });
  },
  login: async data => {
    let orgRes = null;
    let organization = null;
    const response = await authService.getToken(data);
    const { status, data: user } = response;
    if (status === 200) {
      orgRes = await authService.getOrganizationConfig();
      organization = orgRes ? { ...orgRes.data } : null;
    }

    return { user, organization, token: status };
  },
  onboarding: data => {
    return axios({
      method: 'PUT',
      url: `${REACT_APP_API_URL}organization/configuration`,
      data,
    });
  },
  logout: async () => {
    return axios({
      method: 'GET',
      url: `${REACT_APP_API_URL}auth/logout`,
    });
  },
  forgotPassword: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/reset-password`,
      data,
    });
  },
  resetPassword: async data => {
    const headers = { authorization: `Bearer ${data.authorization}` };
    delete data.authorization;
    delete data.confirmPassword;
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/reset-password`,
      headers,
      data,
    });
  },
};

export default authService;
