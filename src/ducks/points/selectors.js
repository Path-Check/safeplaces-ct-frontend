import moment from 'moment';

const currentDateFormat = 'ddd, MMMM D, YYYY';

const pointsSelectors = {
  getPoints: state =>
    state.points.points.sort((a, b) => moment(b.time) - moment(a.time)),
  getFilteredPoints: state => {
    const { points, dateRange, singleDate } = state.points;
    const dateRangeFilter = p =>
      moment(moment(p.time).format(currentDateFormat)).isBetween(
        moment(dateRange[0], currentDateFormat),
        moment(dateRange[1], currentDateFormat),
        undefined,
        '[]',
      );

    const singleDateFilter = p =>
      moment(moment(p.time).format(currentDateFormat)).isSame(
        moment(singleDate, 'ddd, MMMM D, YYYY'),
      );

    const dateFilter = singleDate ? singleDateFilter : dateRangeFilter;
    return points
      .filter(dateFilter)
      .sort((a, b) => moment(b.time) - moment(a.time));
  },
  getActivePoint: state => state.points.activePoint,
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
};

export default pointsSelectors;
