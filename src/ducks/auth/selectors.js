const authSelectors = {
  getToken: state => state.auth.token,
  getCurrentUser: state => state.auth.currentUser,
  getBounds: state => state.auth.currentUser.regionCoordinates,
  getOnboardingStatus: state => state.auth.currentUser?.completedOnboarding,
  getApiEndpoint: state => state.auth.currentUser?.apiEndpoint,
  getLoginState: state => ({
    fetching: state.auth.fetching,
    error: state.auth.error,
    errorResponse: state.auth.errorResponse,
  }),
};

export default authSelectors;
