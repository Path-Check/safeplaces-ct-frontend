import authTypes from './types';

const authActions = {
  requestLogin: data => ({
    type: authTypes.REQUEST,
    data,
  }),
};

export default authActions;
