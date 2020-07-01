import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import cases from './cases/reducer';
import auth from './auth/reducer';
import map from './map/reducer';
import application from './application/reducer';
import points from './points/reducer';
import tags from './tags/reducer';

import { createBrowserHistory } from 'history';

export const history = createBrowserHistory();
const reducers = combineReducers({
  application,
  auth,
  cases,
  points,
  tags,
  router: connectRouter(history),
  map,
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_VIEW') {
    const { auth, router, tags } = state;

    state = { auth, router, tags };
  }

  return reducers(state, action);
};

export default rootReducer;
