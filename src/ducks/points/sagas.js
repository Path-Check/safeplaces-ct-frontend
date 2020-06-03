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
        title: `Point ${id} Deleted`,
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

function* editPoint({ point }) {
  yield put(applicationActions.updateStatus('BUSY'));

  try {
    yield call(pointsService.edit, point);
    const currentPoints = yield select(pointsSelectors.getPoints);

    const points = currentPoints.filter(p => p.pointId !== point.pointId);

    yield put(pointsActions.updatePoints([...points, point]));

    yield put(
      applicationActions.notification({
        title: `You just added 1 data point`,
      }),
    );

    yield put(mapActions.updateLocation(null));
    yield put(pointsActions.setSelectedPoint(null));
  } catch (error) {
    console.log(error);

    yield put(
      applicationActions.notification({
        title: 'Unable to edit point',
        text: 'Please try again.',
      }),
    );
  }

  yield put(applicationActions.updateStatus('CASE ACTIVE'));
}

export default function* pointsSagas() {
  yield takeEvery(pointsTypes.DELETE_POINT, deletePoint);
  yield takeEvery(pointsTypes.EDIT_POINT, editPoint);
}
