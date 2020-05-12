export const getselectedPoints = state => state.selectedPoints;

export const getselectedPointsData = state => {
  var flattened = state.selectedPoints.reduce(function (
    accumulator,
    currentValue,
  ) {
    console.log('state', state);
    if (state.path.points[currentValue])
      accumulator.push(state.path.points[currentValue]);
    return accumulator;
  },
  []);
  return flattened;
};
