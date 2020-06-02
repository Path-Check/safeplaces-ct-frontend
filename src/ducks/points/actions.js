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
};

export default pointsActions;
