import { call, put, select, takeEvery, takeLatest } from 'redux-saga/effects';
import mapTypes from 'ducks/map/types';
import mapActions from 'ducks/map/actions';
import applicationActions from 'ducks/application/actions';

function* setLocation({ location }) {
  console.log(location);

  yield put(mapActions.updateLocation(location));
  yield put(applicationActions.updateStatus('EDIT POINT'));
}

export default function* mapSagas() {
  yield takeLatest(mapTypes.SET_LOCATION, setLocation);
}
