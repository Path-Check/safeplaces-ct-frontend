import React, { useState, useEffect, useRef } from 'react';
import { fromJS } from 'immutable';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
} from 'react-map-gl';

import { useSelector, useDispatch } from 'react-redux';

import defaultMapStyleJson from './style.json';
import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import { defaultMapStyle } from 'components/_shared/Map/config';
import casesSelectors from 'ducks/cases/selectors';

import Notifications from 'components/_global/Notifications';
import Popup from './Popup';
import MapMarker from 'components/_shared/Map/Marker';

export default function Map({ setMap }) {
  const dispatch = useDispatch();
  const [mapStyle, setMapStyle] = useState(defaultMapStyle);
  const [viewport, setViewport] = useState({
    width: 400,
    height: 300,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8,
  });
  const mapRef = useRef();
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));

  useEffect(() => {
    var zooming = {};

    if (!activeCase || !activeCase.points) {
      return;
    }

    const points = {
      type: 'FeatureCollection',
      features: activeCase.points.map((point, index) => ({
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

    const mapStyleUpdate = mapStyle.setIn(
      ['sources', 'points'],
      fromJS({
        type: 'geojson',
        data: points,
      }),
    );

    if (JSON.stringify(mapStyleUpdate) !== JSON.stringify(mapStyle)) {
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
  }, [mapStyle, activeCase]);

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
  };

  return (
    <ReactMapGL
      className="map"
      {...viewport}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
      mapStyle={mapStyle}
      ref={mapRef}
      width="100%"
      height="100%"
      onLoad={onMapLoad}
      onViewportChange={viewportInternal => setViewport(viewportInternal)}
    >
      {activeCase?.points?.map(p => (
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
