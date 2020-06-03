import pointsTypes from './types';

const pointsActions = {
  updatePoints: points => ({
    type: pointsTypes.POINTS,
    points,
  }),
  updateSelectedPoints: points => ({
    type: pointsTypes.SELECTED_POINTS,
    points,
  }),
  setSelectedPoint: id => ({
    type: pointsTypes.ACTIVE_POINT,
    id,
  }),
  deletePoint: id => ({
    type: pointsTypes.DELETE_POINT,
    id,
  }),
  editPoint: id => ({
    type: pointsTypes.EDIT_POINT,
    id,
  }),
  addPoint: coords => ({
    type: pointsTypes.ADD_POINT,
    coords,
  }),
};

export default pointsActions;
