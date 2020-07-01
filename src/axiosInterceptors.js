import axios from 'axios';

import authTypes from './ducks/auth/types';

axios.defaults.withCredentials = true;

export default {
  setupInterceptors: store => {
    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // catches if the session ended!
        if (error.response.status === 401) {
          localStorage.clear();
          store.dispatch({ type: authTypes.login.LOGOUT, data: true });
        }
        return Promise.reject(error);
      },
    );
  },
};
