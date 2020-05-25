import { all } from 'redux-saga/effects';
import { authSaga } from './ducks/auth/sagas';

export default function* rootSaga() {
  yield all([authSaga()]);
}
