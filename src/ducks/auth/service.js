import axios from 'axios';

const REACT_APP_API_URL = process.env;

const authService = {
  login: ({ data }) => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}/login`,
      data: data,
    });
  },
};

export default authService;
