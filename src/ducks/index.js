import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import cases from './cases';
import selectedPoints from './selectedPoints';
import filter from './filter';
import auth from './auth/reducer';
import settingsApi from './settingsApi';
import map from './map';
import records from './record/reducer';
import application from './application/reducer';

const rootReducer = history =>
  combineReducers({
    application,
    auth,
    records,
    cases: cases.reducer,
    settingsApi,
    filter: filter.reducer,
    selectedPoints,
    router: connectRouter(history),
    map,
  });

export default rootReducer;
