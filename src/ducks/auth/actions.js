import authTypes from './types';

const { onboarding, login } = authTypes;

const authActions = {
  loginRequest: data => ({
    type: login.REQUEST,
    data,
  }),
  loginSuccess: data => ({
    type: login.SUCCESS,
    data,
  }),
  loginFailure: error => ({
    type: login.REQUEST,
    error,
  }),
  onboardingRequest: data => ({
    type: onboarding.REQUEST,
    data,
  }),
  onboardingSuccess: data => ({
    type: onboarding.SUCCESS,
    data,
  }),
  onboardingFailure: error => ({
    type: onboarding.REQUEST,
    error,
  }),
};

export default authActions;
