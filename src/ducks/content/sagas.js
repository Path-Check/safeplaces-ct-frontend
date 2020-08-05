import { call, put, select, takeEvery } from 'redux-saga/effects';

import contentService from 'ducks/content/service';
import contentActions from 'ducks/content/actions';

import contentTypes from 'ducks/content/types';
import contentSelectors from 'ducks/content/selectors';
import { applicationStates } from 'types/applicationStates';
import applicationActions from 'ducks/application/actions';

function* determineContent() {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  const language = yield select(contentSelectors.getLanguage);

  try {
    const response = yield call(contentService.fetchContent, language);
    const { data } = response;

    yield put(contentActions.setContent(data));
  } catch (error) {}

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

export default function* contentSagas() {
  yield takeEvery(contentTypes.LANGUAGE, determineContent);
}
