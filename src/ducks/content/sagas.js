import { call, put, select, takeEvery } from 'redux-saga/effects';

import contentService from 'ducks/content/service';
import contentActions from 'ducks/content/actions';

import contentTypes from 'ducks/content/types';
import contentSelectors from 'ducks/content/selectors';

function* determineContent() {
  const language = yield select(contentSelectors.getLanguage);

  try {
    const response = yield call(contentService.fetchContent, language);
    const { data } = response;

    yield put(contentActions.setContent(data));
  } catch (error) {}
}

export default function* contentSagas() {
  yield takeEvery(contentTypes.LANGUAGE, determineContent);
}
