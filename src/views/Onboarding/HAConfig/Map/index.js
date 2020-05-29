import React, { useState, useRef, useEffect } from 'react';
import { fromJS } from 'immutable';

import ReactMapGL, { NavigationControl } from 'react-map-gl';

import mapboxgl from 'mapbox-gl';

import Geocoder from 'react-map-gl-geocoder';
import 'react-map-gl-geocoder/dist/mapbox-gl-geocoder.css';

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
  const geocoderContainerRef = useRef();
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

  return (
    <div className={styles.map}>
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={defaultMapStyle}
        ref={mapRef}
        width="100%"
        height="calc(100vh - 10%)"
        onViewportChange={viewportInternal => setViewport(viewportInternal)}
      >
        <NavigationControl
          showCompass={true}
          className={`mapboxgl-ctrl-bottom-right ${styles.mapCtrl}`}
        />
        <div ref={geocoderContainerRef} className={styles.mapGeocoder} />
        <Geocoder
          mapRef={mapRef}
          containerRef={geocoderContainerRef}
          onViewportChange={setViewport}
          mapboxApiAccessToken={mapboxgl.accessToken}
        />
        <Button
          className={styles.saveButton}
          onClick={() => {
            confirmBounds(map.getBounds());
          }}
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
