import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  createUser: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/create`,
      data,
    });
  },
  getAllUsers: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/list`,
      data,
    });
  },
};

export default authService;
