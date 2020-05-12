export const getselectedPoints = state => state.selectedPoints;

export const getselectedPointsData = state => {
  const entries = state.selectedPoints.map(e => {
    return state.path.points[e] ? state.path.points[e] : undefined;
  });
  return entries;
};
