import axios from 'axios';

import { history } from './store';

export default {
  setupInterceptors: store => {
    axios.interceptors.request.use(
      config => {
        const state = store.getState();
        const token =
          state.auth && state.auth.token ? state.auth.token : undefined;
        if (token) {
          config.headers.authorization = 'Bearer ' + token;
        }
        return config;
      },
      error => {
        Promise.reject(error);
      },
    );

    axios.interceptors.response.use(
      function (response) {
        return response;
      },
      function (error) {
        // catches if the session ended!
        if (error.response.status === 401) {
          localStorage.clear();
          store.dispatch({ type: 'LOGOUT', data: true });
          history.push('/login');
        }
        return Promise.reject(error);
      },
    );
  },
};
