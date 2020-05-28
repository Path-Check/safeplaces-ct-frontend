import { all } from 'redux-saga/effects';
import { authSaga } from './ducks/auth/sagas';
import casesSagas from 'ducks/cases/sagas';

export default function* rootSaga() {
  yield all([authSaga(), casesSagas()]);
}
