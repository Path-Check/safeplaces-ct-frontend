export const currentPointLayer = {
  id: 'currentPointLayer',
  type: 'circle',
  source: 'currentpoints',
  interactive: true,
  paint: {
    'circle-color': '#0f7eff',
    'circle-radius': 7,
    'circle-stroke-width': 3,
    'circle-stroke-color': '#ffffff',
  },
};

export const selectedPointLayerAccuracy = {
  id: 'selectedPointLayerAccuracy',
  type: 'circle',
  source: 'points',
  interactive: true,
  paint: {
    'circle-color': '#0f7eff',
    'circle-radius': [
      'interpolate',
      ['exponential', 2],
      ['zoom'],
      0,
      0,
      20,
      ['*', 20, ['get', 'accuracy']],
    ],
    'circle-opacity': 0.2,
    'circle-stroke-width': 0,
    'circle-stroke-color': '#ffffff',
  },
  filter: ['in', 'storeId', '5cdaca36bab5e21e9ee19344'],
};

export const currentPointLayerAccuracy = {
  id: 'currentPointLayerAccuracy',
  type: 'circle',
  source: 'currentpoints',
  interactive: true,
  paint: {
    'circle-color': '#0f7eff',
    'circle-radius': [
      'interpolate',
      ['exponential', 2],
      ['zoom'],
      0,
      0,
      20,
      ['*', 20, ['get', 'accuracy']],
    ],
    'circle-opacity': 0.2,
    'circle-stroke-width': 0,
    'circle-stroke-color': '#ffffff',
  },
};

export const currentPointLayerShadow = {
  id: 'currentPointLayerShadow',
  type: 'circle',
  source: 'currentpoints',
  interactive: true,
  paint: {
    'circle-color': '#000000',
    'circle-radius': 15,
    'circle-translate': [0, 3],
    'circle-opacity': 0.5,
    'circle-blur': 1,
    'circle-stroke-width': 0,
    'circle-stroke-color': '#ffffff',
  },
};

export const pointLayer = {
  id: 'pointLayer',
  type: 'circle',
  source: 'points',
  paint: {
    // 'circle-color': '#165078',
    'circle-stroke-width': 2,
    'circle-stroke-color': '#FFFFFF',
    'circle-color': [
      'match',
      ['get', 'storeId'],
      '5cdaca36bab5e21e9ee19344',
      '#fbb03b',
      /* other */ '#165078',
    ],
    'circle-radius': 5,
  },
  // filter: ['in', 'storeId', '5cdaca36bab5e21e9ee19344']
};

export const pointLayerShadow = {
  id: 'pointLayerShadow',
  type: 'circle',
  source: 'points',
  interactive: true,
  paint: {
    'circle-color': '#000000',
    'circle-radius': 8,
    'circle-translate': [0, 3],
    'circle-opacity': 0.3,
    'circle-blur': 0.6,
    'circle-stroke-width': 0,
    'circle-stroke-color': '#ffffff',
  },
};

export const lineLayer = {
  id: 'LineString',
  type: 'line',
  source: 'lines',
  layout: {
    'line-join': 'round',
    'line-cap': 'round',
  },
  paint: {
    'line-width': 3,
    'line-opacity': 0.5,
    'line-gradient': [
      'interpolate',
      ['linear'],
      ['line-progress'],
      0,
      '#0065D9',
      1,
      '#00D9FF',
    ],
  },
};

export const emptyFeature = {
  type: 'geojson',
  data: {
    features: [],
    type: 'FeatureCollection',
  },
};
