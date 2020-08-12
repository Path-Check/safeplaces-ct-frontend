const authTypes = {
  login: {
    REQUEST: 'auth/REQUEST_LOGIN',
    SUCCESS: 'auth/SUCCESS_LOGIN',
    FAILURE: 'auth/FAILURE_LOGIN',
    FORGOT_PASSWORD: 'auth/FORGOT_PASSWORD',
    FORGOT_PASSWORD_SUCCESS: 'auth/FORGOT_PASSWORD_SUCCESS',
    RESET_PASSWORD: 'auth/RESET_PASSWORD',
  },
  logout: {
    REQUEST: 'auth/REQUEST_LOGOUT',
  },
  onboarding: {
    REQUEST: 'auth/REQUEST_ONBOARDING',
    SUCCESS: 'auth/SUCCESS_ONBOARDING',
    FAILURE: 'auth/FAILURE_ONBOARDING',
  },
};

export default authTypes;
