export const toPoint = point => ({
  type: 'Feature',
  properties: {
    id: point.pointId,
  },
  geometry: {
    type: 'Point',
    coordinates: [point.longitude, point.latitude],
  },
});
