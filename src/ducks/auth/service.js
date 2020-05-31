import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  login: async data => {
    const tokenRes = await axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}login`,
      data,
    });
    const { token } = tokenRes.data;
    let orgRes = null;
    if (token) {
      orgRes = await axios({
        method: 'GET',
        url: `${REACT_APP_API_URL}organization`,
        data,
      });
    }
    // TODO completedOnboarding will soon come from BE
    const user = orgRes ? { ...orgRes.data } : null;

    return { user, token };
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
