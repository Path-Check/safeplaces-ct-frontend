export const getFilter = state => state.filter;

export const getTrackPath = state => {
  const path = getCurrentPath(state);
  return path && path.points
    ? Object.values(state.path.points).sort(function (a, b) {
        return a.time - b.time;
      })
    : [];
};

export const getCurrentPath = state =>
  state.cases.entries[state.cases.currentCase] &&
  state.cases.entries[state.cases.currentCase].points
    ? state.cases.entries[state.cases.currentCase]
    : undefined;

export const getFilteredTrackPath = state => {
  const path = getCurrentPath(state);
  return path
    ? pointObjectToArray(path.points)
        .sort(function (a, b) {
          return a.time - b.time;
        })
        .filter(e => {
          if (state.filter.dates.start) {
            return (
              e.time >= state.filter.dates.start &&
              e.time <= state.filter.dates.end
            );
          }
          return true;
        })
    : [];
};

export const getTrackStart = state => {
  const path = getCurrentPath(state);
  return (
    path &&
    Math.min.apply(
      Math,
      pointObjectToArray(path.points).map(function (o) {
        return o.time;
      }),
    )
  );
};

export const getTrackEnd = state => {
  const path = getCurrentPath(state);
  if (path)
    return Math.max.apply(
      Math,
      pointObjectToArray(path.points).map(function (o) {
        return o.time;
      }),
    );
};

const pointObjectToArray = points => {
  return Object.entries(points).map(e => ({ ...e[1], id: e[0] }));
};

export const getSelectedPointsDataData = ({ selectedPoints, path }) => {
  const selectedEntries =
    path && path.points && selectedPoints
      ? pointObjectToArray(path.points).filter(e => {
          return e.id !== selectedPoints.id;
        })
      : undefined;
  return selectedEntries;
};

export const getSelectedPointsData = state => state.selectedPoints;
