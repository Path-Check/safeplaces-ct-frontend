import { all } from 'redux-saga/effects';
import { authSaga } from './ducks/auth/sagas';
import casesSagas from 'ducks/cases/sagas';
import pointsSagas from 'ducks/points/sagas';
import { registrationSagas } from 'ducks/registration/sagas';
import mapSagas from 'ducks/map/sagas';
import { usersSaga } from './ducks/users/sagas';

export default function* rootSaga() {
  yield all([
    authSaga(),
    casesSagas(),
    pointsSagas(),
    mapSagas(),
    registrationSagas(),
    usersSaga(),
  ]);
}
