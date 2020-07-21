import { put, select, takeLatest } from 'redux-saga/effects';
import mapTypes from 'ducks/map/types';
import mapActions from 'ducks/map/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

function* setLocation({ location }) {
  const appStatus = yield select(applicationSelectors.getStatus);

  yield put(mapActions.updateLocation(location));
}

export default function* mapSagas() {
  yield takeLatest(mapTypes.SET_LOCATION, setLocation);
}
