import { all, fork } from 'redux-saga/effects';
import { loginSaga } from 'ducks/auth';

export default function* rootSaga() {
  yield all([fork(loginSaga)]);
}
