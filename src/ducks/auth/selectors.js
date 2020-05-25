const authSelectors = {
  getToken: state => state.auth.token,
  getCurrentUser: state => state.auth.currentUser,
  getLoginState: state => ({
    fetching: state.auth.fetching,
    error: state.auth.error,
    errorResponse: state.auth.errorResponse,
  }),
};

export default authSelectors;
