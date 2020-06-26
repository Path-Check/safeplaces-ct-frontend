import { call, put, select, takeEvery } from 'redux-saga/effects';

import differenceBy from 'lodash/differenceBy';

import applicationActions from 'ducks/application/actions';
import pointsActions from 'ducks/points/actions';
import pointsTypes from 'ducks/points/types';
import pointsService from 'ducks/points/service';
import pointsSelectors from 'ducks/points/selectors';
import mapActions from 'ducks/map/actions';
import casesSelectors from 'ducks/cases/selectors';
import { mapPoints } from 'helpers/pointsUtils';
import tagsActions from 'ducks/tags/actions';

function* deletePoint({ id }) {
  yield put(applicationActions.updateStatus('BUSY'));

  try {
    yield call(pointsService.delete, id);
    const currentPoints = yield select(pointsSelectors.getPoints);
    const points = currentPoints.filter(p => p.pointId !== id);

    yield put(pointsActions.updatePoints(points));

    yield put(
      applicationActions.notification({
        title: `Point Deleted`,
      }),
    );

    yield put(pointsActions.setSelectedPoint(null));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: 'Unable to delete point. ',
        text: 'Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus('CASE ACTIVE'));
}

function* deletePoints() {
  yield put(applicationActions.updateStatus('BUSY'));
  const filteredPoints = yield select(pointsSelectors.getFilteredPoints);
  const points = yield select(pointsSelectors.getPoints);

  try {
    yield call(
      pointsService.deletePoints,
      filteredPoints.map(({ pointId }) => pointId),
    );

    const diff = differenceBy(points, filteredPoints, 'pointId');
    yield put(pointsActions.updatePoints(diff));

    yield put(
      applicationActions.notification({
        title: `${filteredPoints.length} Point(s) Deleted`,
      }),
    );
    yield put(pointsActions.setSelectedPoint(null));
    yield put(pointsActions.clearFilters());

    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(applicationActions.updateStatus('DELETE POINTS'));
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
  const currentPoints = yield select(pointsSelectors.getPoints);
  const { caseId } = yield select(casesSelectors.getActiveCases);

  yield put(applicationActions.updateStatus('BUSY'));

  let data = null;

  try {
    if (isEdit) {
      data = {
        ...point,
      };

      const response = yield call(pointsService.edit, data);
      const points = currentPoints.filter(p => p.pointId !== point.pointId);
      const mappedPoints = mapPoints([...points, response.data.concernPoint]);
      yield put(pointsActions.updatePoints(mappedPoints));
    } else {
      data = {
        caseId,
        point,
      };

      const response = yield call(pointsService.add, data);
      const mappedPoints = mapPoints([
        response.data.concernPoint,
        ...currentPoints,
      ]);
      yield put(pointsActions.updatePoints(mappedPoints));
    }

    yield put(mapActions.updateLocation(null));
    yield put(pointsActions.setSelectedPoint(null));

    yield put(
      applicationActions.notification({
        title: `You just ${isEdit ? 'edited' : 'added'} 1 data point`,
      }),
    );
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: `Unable to ${isEdit ? 'edit' : 'add'} point. `,
        text: 'Please try again.',
      }),
    );
    yield put(
      applicationActions.updateStatus(isEdit ? 'EDIT POINT' : 'ADD POINT'),
    );
  }
}

function* setPointLabel({ data }) {
  yield put(applicationActions.updateStatus('BUSY'));
  yield put(tagsActions.setTags(data.nickname));

  try {
    const response = yield call(pointsService.setLabel, data);
    const concernPoints = response.data.concernPoints;
    yield put(pointsActions.updatePoints(concernPoints));
    yield put(applicationActions.updateStatus('IDLE'));
  } catch (error) {
    yield put(applicationActions.updateStatus('IDLE'));
  }
}

export default function* pointsSagas() {
  yield takeEvery(pointsTypes.DELETE_POINT, deletePoint);
  yield takeEvery(pointsTypes.DELETE_POINTS, deletePoints);
  yield takeEvery(pointsTypes.EDIT_POINT, updatePoint);
  yield takeEvery(pointsTypes.ADD_POINT, updatePoint);
  yield takeEvery(pointsTypes.SET_LABEL, setPointLabel);
}
