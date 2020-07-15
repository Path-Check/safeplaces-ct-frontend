import _ from 'lodash';
import moment from 'moment';
import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';
import { getDates, CURRENT_DATE_FORMAT } from 'helpers/pointsUtils';
import { createSelector } from 'reselect';

const pointsStoreSelector = state => state.points;
const pointsSelector = state => state.points.points;

export const getPoints = createSelector(pointsSelector, points => {
  if (points?.length < 1) {
    return [];
  }

  return points;
});

export const getFilteredPoints = createSelector(
  pointsStoreSelector,
  pointsStore => {
    const {
      dateRange,
      singleDate,
      geometry,
      duration,
      recordIds,
      useDurationFilter,
      points,
    } = pointsStore;

    if (!points || points?.length < 1) return [];

    const dateRangeFilter = p =>
      dateRange.length === 0 ||
      moment(moment(p.time).format(CURRENT_DATE_FORMAT)).isBetween(
        moment(dateRange[0], CURRENT_DATE_FORMAT),
        moment(dateRange[1], CURRENT_DATE_FORMAT),
        undefined,
        '[]',
      );

    const recordIdFilter = p =>
      recordIds && recordIds.length ? recordIds.includes(p.caseId) : p;

    const singleDateFilter = p =>
      moment(moment(p.time).format(CURRENT_DATE_FORMAT)).isSame(
        moment(singleDate, CURRENT_DATE_FORMAT),
      );

    const dateFilter = singleDate ? singleDateFilter : dateRangeFilter;

    const durationFilter = p => {
      return !useDurationFilter || (duration && p.duration >= duration);
    };

    const geometryFilter = p => {
      if (!geometry) {
        return p;
      } else {
        return inside(toPoint(p), geometry);
      }
    };

    return points
      .filter(
        p =>
          dateFilter(p) &&
          durationFilter(p) &&
          recordIdFilter(p) &&
          geometryFilter(p),
      )
      .sort((a, b) => moment(b.time) - moment(a.time));
  },
);

export const getAllowStaging = createSelector(
  getFilteredPoints,
  getPoints,
  (filteredPoints, points) => {
    return filteredPoints.length === points.length;
  },
);

const pointsSelectors = {
  getGeometry: state => state.points.geometry,
  getActivePoint: state => state.points.activePoint,
  getPointsDates: state => getDates(state.points.points),
  getDateRange: state => state.points.dateRange,
  getSingleDate: state => state.points.singleDate,
  getUseDurationFilter: state => state.points.useDurationFilter,
  getDuration: state => state.points.duration,
};

export default pointsSelectors;
