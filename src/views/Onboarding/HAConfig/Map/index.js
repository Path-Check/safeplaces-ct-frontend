import React, { useState, useRef, useEffect } from 'react';
import { fromJS } from 'immutable';

import ReactMapGL, { NavigationControl } from 'react-map-gl';

import mapboxgl from 'mapbox-gl';

import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

import { MapboxLayerSwitcherControl } from 'mapbox-layer-switcher';
import 'mapbox-layer-switcher/styles.css';

import styles from './styles.module.scss';
import defaultMapStyleJson from './style.json';

import Button from 'components/_shared/Button';

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

var defaultMapStyle = fromJS(jsonStyle);

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_KEY;

export default function Map({ confirmBounds }) {
  const mapRef = useRef();
  const [map, setMap] = useState(null);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 300,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });

  useEffect(() => {
    if (!mapRef.current) {
      return;
    }

    setMap(mapRef.current.getMap());
  }, [map, setMap]);

  const onMapLoad = e => {
    const styles = [];

    styles.push({
      id: 'composite',
      title: 'MapBox',
      type: 'base',
      visibility: 'none',
    });

    defaultMapStyleJson.layers.forEach(element => {
      if (element.base === 'true') {
        styles.push({
          id: element.id,
          title: element.title,
          type: 'base',
          visibility: element.layout.visibility,
        });
      }
    });

    map.addControl(new MapboxLayerSwitcherControl(styles));
  };

  return (
    <div className={styles.map}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={defaultMapStyle}
        ref={mapRef}
        width="100%"
        height="90vh"
        onLoad={onMapLoad}
        onViewStateChange={viewportInternal => {
          console.log('here');
          setViewport(viewportInternal);
        }}
      >
        <NavigationControl
          showCompass={true}
          className={`mapboxgl-ctrl-bottom-left ${styles.mapCtrl}`}
        />
        <Geocoder
          mapRef={mapRef}
          onViewportChange={setViewport}
          mapboxApiAccessToken={mapboxgl.accessToken}
          position="top-right"
        />
        <Button
          className={styles.saveButton}
          onClick={() => confirmBounds(map.getBounds())}
        >
          Use Current View as GPS Boundary
        </Button>
        <div className={styles.mapFocusArea}>
          <span className={`${styles.focusIcon} ${styles.topLeft}`} />
          <span className={`${styles.focusIcon} ${styles.topRight}`} />
          <span className={`${styles.focusIcon} ${styles.bottomLeft}`} />
          <span className={`${styles.focusIcon} ${styles.bottomRight}`} />
        </div>
      </ReactMapGL>
    </div>
  );
}
