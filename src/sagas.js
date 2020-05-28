import { all } from 'redux-saga/effects';
import { authSaga } from './ducks/auth/sagas';
import { addSaga, deleteSaga } from './ducks/record/sagas';

export default function* rootSaga() {
  yield all([authSaga(), addSaga(), deleteSaga()]);
}
