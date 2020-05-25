import { all } from 'redux-saga/effects';
import { loginSaga } from './ducks/auth/sagas';

export default function* rootSaga() {
  yield all([loginSaga]);
}
