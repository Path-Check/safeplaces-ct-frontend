import { call, put, select, takeEvery } from 'redux-saga/effects';

import applicationActions from 'ducks/application/actions';
import pointsActions from 'ducks/points/actions';
import pointsTypes from 'ducks/points/types';
import pointsService from 'ducks/points/service';
import pointsSelectors from 'ducks/points/selectors';
import mapActions from 'ducks/map/actions';

function* deletePoint({ id }) {
  yield put(applicationActions.updateStatus('BUSY'));

  try {
    yield call(pointsService.delete, id);
    const currentPoints = yield select(pointsSelectors.getPoints);

    // filter using ID
    const points = currentPoints.filter(p => p.pointId !== id);

    yield put(pointsActions.updatePoints(points));
    yield put(
      applicationActions.notification({
        title: `Point Deleted`,
      }),
    );
    yield put(pointsActions.setSelectedPoint(null));
  } catch (error) {
    console.log(error);

    yield put(
      applicationActions.notification({
        title: 'Unable to delete point',
        text: 'Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus('CASE ACTIVE'));
}

function* updatePoint({ point, type }) {
  const isEdit = type === pointsTypes.EDIT_POINT;
  const currentPoints = yield select(pointsSelectors.getPoints);

  yield put(applicationActions.updateStatus('BUSY'));

  try {
    if (isEdit) {
      const response = yield call(pointsService.edit, point);
      const points = currentPoints.filter(p => p.pointId !== point.pointId);
      yield put(pointsActions.updatePoints([...points, response.data.point]));
    } else {
      const response = yield call(pointsService.add, point);
      yield put(
        pointsActions.updatePoints([
          response.data.concernPoint,
          ...currentPoints,
        ]),
      );
    }

    yield put(mapActions.updateLocation(null));
    yield put(pointsActions.setSelectedPoint(null));

    yield put(
      applicationActions.notification({
        title: `You just ${isEdit ? 'edited' : 'added'} 1 data point`,
      }),
    );
  } catch (error) {
    yield put(
      applicationActions.notification({
        title: `Unable to ${isEdit ? 'edit' : 'add'} point`,
        text: 'Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus('IDLE'));
}

export default function* pointsSagas() {
  yield takeEvery(pointsTypes.DELETE_POINT, deletePoint);
  yield takeEvery(pointsTypes.EDIT_POINT, updatePoint);
  yield takeEvery(pointsTypes.ADD_POINT, updatePoint);
}
