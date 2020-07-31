import usersTypes from './types';

const {
  CREATE_USER_REQUEST,
  CREATE_USER_SUCCESS,
  GET_ALL_USERS_REQUEST,
  GET_ALL_USERS_SUCCESS,
} = usersTypes;

const usersActions = {
  createUserRequest: data => ({
    type: CREATE_USER_REQUEST,
    data,
  }),
  createUserSuccess: data => ({
    type: CREATE_USER_SUCCESS,
    data,
  }),
  getAllUsersRequest: () => ({
    type: GET_ALL_USERS_REQUEST,
  }),
  getAllUsersSuccess: data => ({
    type: GET_ALL_USERS_SUCCESS,
    data,
  }),
};

export default usersActions;
