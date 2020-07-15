import pointsTypes from './types';

const pointsActions = {
  updatePoints: points => ({
    type: pointsTypes.POINTS,
    points,
  }),
  setSelectedPoint: data => ({
    type: pointsTypes.ACTIVE_POINT,
    data,
  }),
  deletePoint: data => ({
    type: pointsTypes.DELETE_POINT,
    data,
  }),
  deleteMultiplePoints: points => ({
    type: pointsTypes.DELETE_MULTIPLE_POINTS,
    points,
  }),
  deleteFilteredPoints: id => ({
    type: pointsTypes.DELETE_FILTERED_POINTS,
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
  setFilters: data => ({
    type: pointsTypes.SET_FILTERS,
    data,
  }),
  setRecordIds: recordIds => ({
    type: pointsTypes.SET_RECORD_IDS,
    recordIds,
  }),
  setPointsLabel: data => ({
    type: pointsTypes.SET_LABEL,
    data,
  }),
  setGeometry: geometry => ({
    type: pointsTypes.SET_GEOMETRY,
    geometry,
  }),
  clearFilters: () => ({
    type: pointsTypes.CLEAR_FILTERS,
  }),
  hidePoint: id => ({
    type: pointsTypes.HIDE_POINT,
    id,
  }),
};

export default pointsActions;
