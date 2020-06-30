import _ from 'lodash';
import moment from 'moment';
import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';
import { getDates, CURRENT_DATE_FORMAT } from 'helpers/pointsUtils';

const pointsSelectors = {
  getPoints: state =>
    state.points.points.sort((a, b) => moment(b.time) - moment(a.time)),
  getGeometry: state => state.points.geometry,
  getFilteredPoints: state => {
    const {
      points,
      dateRange,
      singleDate,
      geometry,
      duration,
      recordIds,
      useDurationFilter,
    } = state.points;
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

    const hiddenFilter = p => !p.hidden;

    return points
      .filter(
        p =>
          dateFilter(p) &&
          durationFilter(p) &&
          hiddenFilter(p) &&
          recordIdFilter(p) &&
          geometryFilter(p),
      )
      .sort((a, b) => moment(b.time) - moment(a.time));
  },
  getActivePoint: state => state.points.activePoint,
  getPointsDates: state => getDates(state.points.points),
  getDateRange: state => state.points.dateRange,
  getSingleDate: state => state.points.singleDate,
  getUseDurationFilter: state => state.points.useDurationFilter,
  getDuration: state => state.points.duration,
  isFiltered: state =>
    !!state.points.useDurationFilter ||
    !!state.points.geometry ||
    !!_.find(state.points.points, point => point.hidden),
};

export default pointsSelectors;
