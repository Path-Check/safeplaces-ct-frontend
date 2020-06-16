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
  editPoint: point => ({
    type: pointsTypes.EDIT_POINT,
    point,
  }),
  addPoint: point => ({
    type: pointsTypes.ADD_POINT,
    point,
  }),
  setDateRange: data => ({
    type: pointsTypes.SET_DATE_RANGE,
    data,
  }),
  setSingleDate: data => ({
    type: pointsTypes.SET_SINGLE_DATE,
    data,
  }),
  // setUseDuration: data => ({
  //   type: pointsTypes.USE_DURATION,
  //   data,
  // }),
  // setDuration: data => ({
  //   type: pointsTypes.SET_DURATION,
  //   data,
  // }),
  setFilters: data => ({
    type: pointsTypes.SET_FILTERS,
    data,
  }),
};

export default pointsActions;
