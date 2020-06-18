import _ from 'lodash';
import moment from 'moment';
import { toPoint } from 'components/_shared/Map/_helpers';
import inside from '@turf/inside';

const currentDateFormat = 'ddd, MMMM D, YYYY';

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
      useDurationFilter,
    } = state.points;
    const dateRangeFilter = p =>
      dateRange.length === 0 ||
      moment(moment(p.time).format(currentDateFormat)).isBetween(
        moment(dateRange[0], currentDateFormat),
        moment(dateRange[1], currentDateFormat),
        undefined,
        '[]',
      );

    const singleDateFilter = p =>
      moment(moment(p.time).format(currentDateFormat)).isSame(
        moment(singleDate, currentDateFormat),
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
          geometryFilter(p),
      )
      .sort((a, b) => moment(b.time) - moment(a.time));
  },
  getActivePoint: state => state.points.activePoint,
  getActiveFilters: state => {
    const {
      dateRange,
      singleDate,
      geometry,
      duration,
      useDurationFilter,
    } = state.points;

    return (
      useDurationFilter ||
      duration ||
      geometry ||
      singleDate ||
      dateRange.length > 0
    );
  },
  getPointsDates: state => {
    const sortedArray = state.points.points.sort(
      (a, b) => moment(a.time) - moment(b.time),
    );
    return [
      ...new Set(
        sortedArray.map(({ time }) => moment(time).format(currentDateFormat)),
      ).values(),
    ];
  },
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
