import { combineReducers } from 'redux';

import patients from './patients';
import selectedTracks from './selectedTracks';
import filter from './filter';
import tracks from './tracks';
import auth from './auth';
import settingsApi from './settingsApi';

const rootReducer = combineReducers({
  auth,
  patients,
  settingsApi,
  filter,
  tracks,
  selectedTracks,
});

export default rootReducer;
