const pointsSelectors = {
  getPoints: state => state.points.points,
  getSelectedPoints: state => state.points.selectedPoints,
  getActivePoint: state => state.points.activePoint,
};

export default pointsSelectors;
