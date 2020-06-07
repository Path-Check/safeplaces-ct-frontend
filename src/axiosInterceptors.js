import axios from 'axios';

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
          sessionStorage.clear();
          store.dispatch({ type: 'LOGOUT', data: true });
        }
        return Promise.reject(error);
      },
    );
  },
};
