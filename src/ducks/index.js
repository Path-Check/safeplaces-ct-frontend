import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import cases from './cases/reducer';
import auth from './auth/reducer';
import map from './map/reducer';
import application from './application/reducer';
import points from './points/reducer';

const rootReducer = history =>
  combineReducers({
    application,
    auth,
    cases,
    points,
    router: connectRouter(history),
    map,
  });

export default rootReducer;
