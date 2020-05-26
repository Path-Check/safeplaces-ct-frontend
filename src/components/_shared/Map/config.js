import defaultMapStyleJson from './style.json';
import { fromJS } from 'immutable';

import {
  lineLayer,
  currentPointLayerAccuracy,
  selectedPointLayerAccuracy,
  pointLayerShadow,
  pointLayer,
  currentPointLayerShadow,
  currentPointLayer,
  emptyFeature,
} from 'components/_shared/Map/layers';

let jsonStyle = JSON.stringify(defaultMapStyleJson).replace(
  /{REACT_APP_HERE_APP_ID}/g,
  process.env.REACT_APP_HERE_APP_ID,
);
jsonStyle = JSON.parse(
  jsonStyle.replace(
    /{REACT_APP_HERE_APP_CODE}/g,
    process.env.REACT_APP_HERE_APP_CODE,
  ),
);

export let defaultMapStyle = fromJS(jsonStyle);

defaultMapStyle = defaultMapStyle
  .updateIn(['layers'], arr =>
    arr.push(
      lineLayer,
      currentPointLayerAccuracy,
      selectedPointLayerAccuracy,
      pointLayerShadow,
      pointLayer,
      currentPointLayerShadow,
      currentPointLayer,
      // selectedPointLayer,
      // selectedPointLayerShadow,
    ),
  )
  .setIn(['sources', 'currentpoints'], fromJS(emptyFeature))
  .setIn(['sources', 'selectedPointLayer'], fromJS(emptyFeature))
  .setIn(['sources', 'selectedPointLayerShadow'], fromJS(emptyFeature))
  .setIn(['sources', 'selectedPointLayerShadow'], fromJS(emptyFeature))
  .setIn(
    ['sources', 'lines'],
    fromJS({
      lineMetrics: true,
      type: 'geojson',
      data: {
        features: [],
        type: 'FeatureCollection',
      },
    }),
  )
  .setIn(['sources', 'points'], fromJS(emptyFeature));
