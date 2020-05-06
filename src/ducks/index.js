import { combineReducers } from 'redux';

import cases from './cases';
import selectedPathEntry from './selectedPathEntry';
import filter from './filter';
import path from './path';
import auth from './auth';
import settingsApi from './settingsApi';

const rootReducer = combineReducers({
  auth,
  cases,
  settingsApi,
  filter,
  path,
  selectedPathEntry,
});

export default rootReducer;
