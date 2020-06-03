import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
} from 'react-map-gl';

import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import { defaultMapStyle } from 'components/_shared/Map/config';
import casesSelectors from 'ducks/cases/selectors';

import Notifications from 'components/_global/Notifications';
import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';

export default function Map({ setMap }) {
  const mapRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const pointsOfConcern = useSelector(state =>
    pointsSelectors.getPoints(state),
  );
  const boundsObject = useSelector(state => authSelectors.getBounds(state));
  const bounds = [
    [boundsObject.sw.longitude, boundsObject.sw.latitude],
    [boundsObject.ne.longitude, boundsObject.ne.latitude],
  ];

  const initial = new WebMercatorViewport({
    width: 800,
    height: 800,
  }).fitBounds(bounds);

  const [viewport, setViewport] = useState({ ...initial, zoom: 5 });

  const onMapLoad = e => {
    setLoaded(true);

    const bounds = [
      [boundsObject.sw.longitude, boundsObject.sw.latitude],
      [boundsObject.ne.longitude, boundsObject.ne.latitude],
    ];

    const focused = new WebMercatorViewport({
      width: mapRef.current._width,
      height: mapRef.current._height,
    }).fitBounds(bounds);

    const viewportCalc = {
      ...viewport,
      ...focused,
      transitionDuration: 1000,
    };

    setViewport(viewportCalc);
  };

  useEffect(() => {
    var zooming = {};

    if (!loaded || !activeCase) {
      return;
    }

    const points = {
      type: 'FeatureCollection',
      features: pointsOfConcern.map((point, index) => ({
        type: 'Feature',
        properties: {
          id: point.pointId,
        },
        geometry: {
          type: 'Point',
          coordinates: [point.longitude, point.latitude],
        },
      })),
    };

    if (points) {
      const bounds = getBounds(points);

      if (bounds) {
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
        transitionDuration: 1000,
      };
      if (JSON.stringify(viewport) !== JSON.stringify(viewportCalc)) {
        setViewport(viewportCalc);
      }
    }
  }, [pointsOfConcern, loaded]);

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      mapStyle={defaultMapStyle}
      ref={mapRef}
      width="100%"
      height="100%"
      onLoad={onMapLoad}
      onViewportChange={viewportInternal => setViewport(viewportInternal)}
    >
      {pointsOfConcern.map(p => (
        <MapMarker {...p} />
      ))}

      <NavigationControl
        className={`mapboxgl-ctrl-bottom-right ${styles.mapCtrl}`}
        showCompass={false}
      />
      <Notifications />
    </ReactMapGL>
  );
}
