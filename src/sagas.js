import { all, fork } from 'redux-saga/effects';
import { loginSaga } from 'ducks/auth';
import { addSaga } from 'ducks/addRecord/sagas';

export default function* rootSaga() {
  yield all([addSaga(), loginSaga()]);
}
