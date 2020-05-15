// import bezierSpline from "@turf/bezier-spline";
// import { lineString } from "@turf/helpers";

const track = ({ trackPath }) => {
  if (!trackPath) return null;
  const points = trackPath.map((point, index) => {
    // const selected = currentStore && point._id === currentStore.storeId ? [point.gps_lng, point.gps_lat] : [0, 0];
    return {
      type: 'Feature',
      properties: {
        id: point.id,
      },
      geometry: {
        type: 'Point',
        coordinates: [point.longitude, point.latitude],
      },
    };
  });

  const lines = trackPath.map(point => {
    return [point.longitude, point.latitude];
  });

  return {
    lines: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: lines,
          },
        },
      ],
    },
    points: {
      type: 'FeatureCollection',
      features: points,
    },
  };
};

export default track;
