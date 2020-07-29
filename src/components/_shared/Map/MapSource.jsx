import React from 'react';
import { Source, Layer } from 'react-map-gl';

const MapSource = React.memo(({ geoPoints }) => (
  <Source id="point" type="geojson" data={geoPoints}>
    <Layer
      id="map-points"
      source="point"
      type="circle"
      paint={{
        'circle-radius': [
          'case',
          ['boolean', ['feature-state', 'activePoint'], false],
          12,
          8,
        ],
        'circle-color': '#4051db',
        'circle-stroke-color': '#fff',
        'circle-stroke-width': 2,
        'circle-stroke-opacity': 0.8,
      }}
    />
  </Source>
));

export default MapSource;
