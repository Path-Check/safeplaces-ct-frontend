import axios from 'axios';

const { REACT_APP_API_URL } = process.env;

const authService = {
  deleteUser: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/delete`,
      data,
    });
  },
  changeUserRole: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/assign-role`,
      data,
    });
  },
  createUser: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/create`,
      data,
    });
  },
  getUser: async data => {
    return axios({
      method: 'POST',
      url: `${REACT_APP_API_URL}auth/users/get`,
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
