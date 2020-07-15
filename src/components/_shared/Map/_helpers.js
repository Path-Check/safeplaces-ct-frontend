import { WebMercatorViewport } from 'react-map-gl';

export const toPoint = point => ({
  type: 'Feature',
  id: point.id,
  properties: {
    ...point,
  },
  geometry: {
    type: 'Point',
    coordinates: [point.longitude, point.latitude],
  },
});

export const returnGeoPoints = points => ({
  type: 'FeatureCollection',
  features: points.map((point, index) => toPoint(point)),
});

export const fallbackViewport = {
  latitude: 37.7577,
  longitude: -122.4376,
};

export const returnViewportConfig = (bounds, height = 600, width = 600) => {
  const boundsExist =
    bounds?.sw?.longitude &&
    bounds?.sw?.latitude &&
    bounds?.ne?.longitude &&
    bounds?.ne?.latitude;

  return boundsExist
    ? new WebMercatorViewport({
        width,
        height,
      }).fitBounds([
        [bounds.sw.longitude, bounds.sw.latitude],
        [bounds.ne.longitude, bounds.ne.latitude],
      ])
    : fallbackViewport;
};

export const returnCursor = (locationSelect, isDragging) =>
  locationSelect
    ? isDragging
      ? 'grab'
      : 'crosshair'
    : isDragging
    ? 'grab'
    : 'inherit';

export const renderDrawingTools = (viewMode, appStatus, pointsLength) =>
  viewMode === 'trace' &&
  appStatus !== 'EDIT POINT' &&
  appStatus !== 'ADD POINT' &&
  pointsLength > 1;
