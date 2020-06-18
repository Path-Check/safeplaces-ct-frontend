export const returnGeoPoints = points => ({
  type: 'FeatureCollection',
  features: points.map((point, index) => ({
    type: 'Feature',
    properties: {
      id: point.pointId,
    },
    geometry: {
      type: 'Point',
      coordinates: [point.longitude, point.latitude],
    },
  })),
});
