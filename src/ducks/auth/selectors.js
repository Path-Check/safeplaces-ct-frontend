const authSelectors = {
  getToken: state => state.auth.token,
  getCurrentOrg: state => state.auth.currentOrg,
  getCurrentUser: state => state.auth.currentUser,
  getBounds: state => state.auth.currentOrg?.regionCoordinates,
  getOnboardingStatus: state => state.auth.currentOrg?.completedOnboarding,
  getApiEndpoint: state => state.auth.currentOrg?.apiEndpointUrl,
  getLoginState: state => ({
    fetching: state.auth.fetching,
    error: state.auth.error,
    errorResponse: state.auth.errorResponse,
  }),
};

export default authSelectors;
