import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import cases from './cases/reducer';
import auth from './auth/reducer';
import map from './map/reducer';
import application from './application/reducer';
import points from './points/reducer';
import tags from './tags/reducer';
import registration from './registration/reducer';
import users from './users/reducer';
import tooltips from './tooltips/reducer';

import { createBrowserHistory } from 'history';
import { put } from 'redux-saga/effects';
import applicationActions from './application/actions';

export const history = createBrowserHistory();

export function* errorHandlerSaga(error) {
  yield put(applicationActions.updateStatus('IDLE'));
  const { response } = error;
  const message = response?.data?.message || 'Something went wrong';
  yield put(applicationActions.notification({ text: message, type: 'error' }));
}

const reducers = combineReducers({
  application,
  auth,
  cases,
  points,
  tags,
  router: connectRouter(history),
  map,
  registration,
  users,
  tooltips,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_VIEW') {
    const { auth, router, tags, tooltips } = state;

    state = { auth, router, tags, tooltips };
  }

  return reducers(state, action);
};

export default rootReducer;
