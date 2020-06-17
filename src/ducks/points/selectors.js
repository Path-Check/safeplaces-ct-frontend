import moment from 'moment';

const pointsSelectors = {
  getPoints: state =>
    state.points.points.sort((a, b) => moment(b.time) - moment(a.time)),
  getFilteredPoints: state =>
    state.points.filteredPoints.sort((a, b) => moment(b.time) - moment(a.time)),
  getActivePoint: state => state.points.activePoint,
  getPointsDates: state => {
    const sortedArray = state.points.points.sort(
      (a, b) => moment(a.time) - moment(b.time),
    );
    return [
      ...new Set(
        sortedArray.map(({ time }) => moment(time).format('ddd, MMMM D, YYYY')),
      ).values(),
    ];
  },
};

export default pointsSelectors;
