import { call, put, select, takeEvery } from 'redux-saga/effects';

import contentService from 'ducks/content/service';
import contentActions from 'ducks/content/actions';
import applicationSelectors from 'ducks/application/selectors';
import applicationTypes from 'ducks/application/types';

function* determineContent() {
  const language = yield select(applicationSelectors.getLanguage);

  try {
    const response = yield call(contentService.fetchContent, language);
    const { data } = response;

    yield put(contentActions.setContent(data));
  } catch (error) {}
}

export default function* contentSagas() {
  yield takeEvery(applicationTypes.LANGUAGE, determineContent);
}
