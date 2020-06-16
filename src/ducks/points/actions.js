import pointsTypes from './types';

const pointsActions = {
  updatePoints: points => ({
    type: pointsTypes.POINTS,
    points,
  }),
  setFilteredPoints: data => ({
    type: pointsTypes.FILTER_POINTS,
    data,
  }),
  setSelectedPoint: data => ({
    type: pointsTypes.ACTIVE_POINT,
    data,
  }),
  deletePoint: id => ({
    type: pointsTypes.DELETE_POINT,
    id,
  }),
  deletePoints: id => ({
    type: pointsTypes.DELETE_POINTS,
    id,
  }),
  editPoint: point => ({
    type: pointsTypes.EDIT_POINT,
    point,
  }),
  addPoint: point => ({
    type: pointsTypes.ADD_POINT,
    point,
  }),
};

export default pointsActions;
