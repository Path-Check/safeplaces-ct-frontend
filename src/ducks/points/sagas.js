import { call, put, select, takeEvery } from 'redux-saga/effects';

import { uniqBy, differenceBy } from 'lodash';

import applicationActions from 'ducks/application/actions';
import pointsActions from 'ducks/points/actions';
import pointsTypes from 'ducks/points/types';
import pointsService from 'ducks/points/service';
import pointsSelectors, { getPoints } from 'ducks/points/selectors';
import mapActions from 'ducks/map/actions';
import casesSelectors from 'ducks/cases/selectors';
import tagsActions from 'ducks/tags/actions';
import { applicationStates } from 'types/applicationStates';

function* deletePoint({ data: { id, discreetPointIds } }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  try {
    yield call(pointsService.delete, discreetPointIds);
    const currentPoints = yield select(pointsSelectors.getPoints);
    const points = currentPoints.filter(p => p.id !== id);

    yield put(pointsActions.updatePoints(points));

    yield put(
      applicationActions.notification({
        title: `Point Deleted`,
      }),
    );

    yield put(applicationActions.setActivePoint(null));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to delete point. ',
        text: 'Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus(applicationStates.CASE_ACTIVE));
}

function* deleteFilteredPoints() {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  const filteredPoints = yield select(getPoints);
  const points = yield select(getPoints);

  try {
    yield call(
      pointsService.deletePoints,
      filteredPoints.map(({ id }) => id),
    );

    const diff = differenceBy(points, filteredPoints, 'id');
    yield put(pointsActions.updatePoints(diff));

    yield put(
      applicationActions.notification({
        title: `${filteredPoints.length} Point(s) Deleted`,
      }),
    );
    yield put(applicationActions.setActivePoint(null));
    yield put(pointsActions.clearFilters());

    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(applicationActions.updateStatus(applicationStates.DELETE_POINTS));
    yield put(
      applicationActions.notification({
        title: 'Unable to delete points',
        text: 'Please try again.',
      }),
    );
  }
}

function* deleteMultiplePoints({ points }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));
  const currentPoints = yield select(getPoints);

  const discreetpoints = points.reduce((pts, point) => {
    return [...pts, ...point.discreetPointIds];
  }, []);

  try {
    yield call(pointsService.deletePoints, discreetpoints);

    const diff = differenceBy(currentPoints, points, 'id');
    yield put(pointsActions.updatePoints(diff));

    yield put(
      applicationActions.notification({
        title: `${points.length} Point(s) Deleted`,
      }),
    );
    yield put(applicationActions.setActivePoint(null));
    yield put(pointsActions.clearFilters());

    yield put(applicationActions.updateStatus(applicationStates.IDLE));
  } catch (error) {
    yield put(applicationActions.updateStatus(applicationStates.DELETE_POINTS));
    yield put(
      applicationActions.notification({
        title: 'Unable to delete points',
        text: 'Please try again.',
      }),
    );
  }
}

function* updatePoint({ point, type }) {
  const isEdit = type === pointsTypes.EDIT_POINT;
  const currentPoints = yield select(getPoints);
  const { caseId } = yield select(casesSelectors.getActiveCases);

  let data = null;

  try {
    if (isEdit) {
      data = {
        ...point,
      };

      const response = yield call(pointsService.edit, data);
      const points = currentPoints.filter(p => p.id !== point.id);
      yield put(
        pointsActions.updatePoints([...points, response.data.concernPoint]),
      );
    } else {
      data = {
        caseId,
        point,
      };

      const response = yield call(pointsService.add, data);

      yield put(
        pointsActions.updatePoints([
          response.data.concernPoint,
          ...currentPoints,
        ]),
      );
    }

    if (isEdit) {
      yield put(applicationActions.updateStatus(applicationStates.IDLE));
    }

    yield put(mapActions.updateLocation(null));
    yield put(applicationActions.setActivePoint(null));

    yield put(
      applicationActions.notification({
        title: `You just ${isEdit ? 'edited' : 'added'} 1 data point`,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: `Unable to ${isEdit ? 'edit' : 'add'} point. `,
        text: 'Please try again.',
        type: 'error',
      }),
    );
    yield put(
      applicationActions.updateStatus(isEdit ? 'EDIT POINT' : 'ADD POINT'),
    );
  }
}

function* setPointLabel({ data }) {
  yield put(applicationActions.updateStatus(applicationStates.BUSY));

  yield put(tagsActions.setTags(data.nickname));

  const currentPoints = yield select(getPoints);

  try {
    const response = yield call(pointsService.setLabel, data);
    const concernPoints = response.data.concernPoints;
    yield put(
      pointsActions.updatePoints(
        uniqBy([...concernPoints, ...currentPoints], 'id'),
      ),
    );

    const title =
      data.nickname === null
        ? 'Point label removed'
        : `${concernPoints.length} point(s) now have the nickname '${data.nickname}'`;

    yield put(
      applicationActions.notification({
        title,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: `Unable to apply nickname to point(s). Please try again.`,
      }),
    );
  }

  yield put(applicationActions.updateStatus(applicationStates.IDLE));
}

export default function* pointsSagas() {
  yield takeEvery(pointsTypes.DELETE_POINT, deletePoint);
  yield takeEvery(pointsTypes.DELETE_MULTIPLE_POINTS, deleteMultiplePoints);
  yield takeEvery(pointsTypes.DELETE_FILTERED_POINTS, deleteFilteredPoints);
  yield takeEvery(pointsTypes.EDIT_POINT, updatePoint);
  yield takeEvery(pointsTypes.ADD_POINT, updatePoint);
  yield takeEvery(pointsTypes.SET_LABEL, setPointLabel);
}
