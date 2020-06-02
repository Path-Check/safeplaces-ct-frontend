const pointsSelectors = {
  getPoints: state => state.points.points,
  getFilteredPoints: state => state.points.filteredPoints,
  getActivePoint: state => state.points.activePoint,
};

export default pointsSelectors;
