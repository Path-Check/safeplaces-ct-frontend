import { combineReducers } from "redux";

import detail from "./detail";
import positions from "./positions";
import patients from "./patients";
import selectedTracks from "./selectedTracks";
import filter from "./filter";
import tracks from "./tracks";
import report from "./report";
import auth from "./auth";
import caseRed from "./case";
import settingsApi from "./settingsApi";

const rootReducer = combineReducers({
  auth,
  caseRed,
  detail,
  positions,
  patients,
  settingsApi,
  filter,
  tracks,
  selectedTracks,
  report,
});

export default rootReducer;
