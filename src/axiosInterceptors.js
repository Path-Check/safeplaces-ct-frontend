import axios from 'axios';
import authActions from './ducks/auth/actions';

axios.defaults.withCredentials = true;

export default {
  setupInterceptors: store => {
    axios.interceptors.request.use(
      config => {
        config.headers.common['X-Requested-With'] = 'XMLHttpRequest';
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
        if (error.response.status === 401 || error.response.status === 403) {
          localStorage.clear();
          store.dispatch(authActions.logout());
        }
        return Promise.reject(error);
      },
    );
  },
};
