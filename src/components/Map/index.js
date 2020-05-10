import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { NavigationControl } from 'react-map-gl';
import { MapboxLayerSwitcherControl } from 'mapbox-layer-switcher';
import 'mapbox-layer-switcher/styles.css';
import Track from './trackPath';
import { addSelected } from '../../ducks/selectedPathEntry';
import { getFilteredTrackPath } from '../../selectors';
import { fromJS } from 'immutable';
import Popup from '../Popup';
import defaultMapStyleJson from './style.json';
import hereMapStyleJson from './herestyle.json';
import WebMercatorViewport from 'viewport-mercator-project';
import getBounds from './getBounds';
import {
  lineLayer,
  currentPointLayerAccuracy,
  selectedPointLayerAccuracy,
  pointLayerShadow,
  pointLayer,
  currentPointLayerShadow,
  currentPointLayer,
  emptyFeature,
} from 'components/Map/layers';
import { useSelector, useDispatch } from 'react-redux';
var defaultMapStyle = fromJS(defaultMapStyleJson);

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

export default function Map({ setMap }) {
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 300,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const mapRef = useRef();
  const trackPath = useSelector(getFilteredTrackPath);
  const dispatch = useDispatch();

  // boundsSource = historyMapData.points;

  useEffect(() => {
    const historyMapData = Track({
      trackPath: trackPath,
    });
    var zooming = {};

    if (trackPath) {
      const { points, lines } = historyMapData;

      const mapStyleUpdate = mapStyle
        .setIn(
          ['sources', 'lines'],
          fromJS({ type: 'geojson', lineMetrics: true, data: lines }),
        )
        .setIn(
          ['sources', 'points'],
          fromJS({ type: 'geojson', data: points }),
        );
      if (JSON.stringify(mapStyleUpdate) !== JSON.stringify(mapStyle)) {
        setMapStyle(mapStyleUpdate);
        const bounds = getBounds(points);
        const mapObject = document.getElementsByClassName('map')[0];
        if (bounds && mapObject) {
          zooming = new WebMercatorViewport({
            width: mapRef.current._width, // mapObject.offsetWidth,
            height: mapRef.current._height, // mapObject.offsetHeight
          }).fitBounds(bounds, {
            padding: 50,
            offset: [0, 0],
          });
        }
        const viewportCalc = {
          ...viewport,
          ...zooming,
          transitionDuration: 500,
        };
        if (JSON.stringify(viewport) !== JSON.stringify(viewportCalc)) {
          setViewport(viewportCalc);
        }
      }
    }
  }, [mapStyle, trackPath, viewport]);
  const onMapLoad = e => {
    const map = mapRef.current.getMap();
    // setMap(map);
    const styles: MapboxStyleDefinition[] = [];
    hereMapStyleJson.layers.forEach(element => {
      styles.push({
        id: element.id,
        title: element.title,
        type: 'base',
        visibility: element.layout.visibility,
      });
    });
    map.addControl(new MapboxLayerSwitcherControl(styles));
  };
  const onMapClick = e => {
    console.log(e);
    var bbox = [
      [e.point[0] - 1, e.point[1] - 1],
      [e.point[0] + 1, e.point[1] + 1],
    ];

    var features = mapRef.current.queryRenderedFeatures(bbox, {
      layers: ['pointLayer'],
    });

    console.log('map clicked', mapRef.current, features);

    if (features.length >= 1) {
      if (features[0].layer.id === 'pointLayer') {
        console.log(features[0].properties.time);
        dispatch(addSelected([features[0].properties.time]));
      }
    }
  };

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      mapStyle={hereMapStyleJson}
      ref={mapRef}
      width="100%"
      height="100vh"
      onClick={onMapClick}
      onLoad={onMapLoad}
      onViewportChange={viewportInternal => setViewport(viewportInternal)}
    >
      <NavigationControl
        showCompass={true}
        className="mapboxgl-ctrl-top-left"
      />

      <Popup />
      <Track />
    </ReactMapGL>
  );
}
