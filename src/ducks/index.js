import { combineReducers } from 'redux';

import cases from './cases';
import selectedPoints from './selectedPoints';
import filter from './filter';
import path from './path';
import auth from './auth';
import settingsApi from './settingsApi';

const rootReducer = combineReducers({
  auth,
  cases: cases.reducer,
  settingsApi,
  filter: filter.reducer,
  path: path.reducer,
  selectedPoints,
});

export default rootReducer;
