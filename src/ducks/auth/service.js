import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  login: async data => {
    const tokenRes = await axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}login`,
      data,
    });
    /* TODO
    this will be used when the mock endpoint exists
    if(token) {
      const idRes = await axios({
        method: 'POST',
        url: `${REACT_APP_API_URL}organization`,
        data,
      });
    }
    */
    return {
      user: { id: 1, name: 'HA Name', completedOnboarding: true },
      token: tokenRes.data.token,
    };
  },
  onboarding: data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}organization/configuration`,
      data,
    });
  },
};

export default authService;
