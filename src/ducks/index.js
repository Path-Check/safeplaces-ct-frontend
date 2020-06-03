import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import cases from './cases/reducer';
import selectedPoints from './selectedPoints';
import filter from './filter';
import auth from './auth/reducer';
import settingsApi from './settingsApi';
import map from './map';
import application from './application/reducer';
import points from './points/reducer';

const rootReducer = history =>
  combineReducers({
    application,
    auth,
    cases,
    points,
    settingsApi,
    filter: filter.reducer,
    selectedPoints,
    router: connectRouter(history),
    map,
  });

export default rootReducer;
