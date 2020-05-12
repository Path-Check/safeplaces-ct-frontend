import { getCurrentPath } from 'selectors';

export const getselectedPoints = state => state.selectedPoints;

export const getSelectedPointsData = state => {
  const path = getCurrentPath(state);
  var flattened = [];
  if (path)
    flattened = state.selectedPoints.reduce(function (
      accumulator,
      currentValue,
    ) {
      if (path.points[currentValue])
        accumulator.push(path.points[currentValue]);
      return accumulator;
    },
    []);
  return flattened;
};
