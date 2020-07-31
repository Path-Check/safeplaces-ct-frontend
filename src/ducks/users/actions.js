import usersTypes from './types';

const { CREATE_USER } = usersTypes;

const usersActions = {
  createUserRequest: data => ({
    type: CREATE_USER,
    data,
  }),
};

export default usersActions;
