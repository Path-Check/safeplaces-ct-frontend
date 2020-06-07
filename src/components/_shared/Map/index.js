import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
} from 'react-map-gl';
import PopupWrapper from './Popup';

import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import { defaultMapStyle } from 'components/_shared/Map/config';

import Notifications from 'components/_global/Notifications';
import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';
import PointEditor from 'components/PointEditor';
import applicationSelectors from 'ducks/application/selectors';
import mapSelectors from 'ducks/map/selectors';
import SelectionLocationHelp from 'components/_shared/Map/SelectionLocationHelp';

export default function Map({ setMap }) {
  const mapRef = useRef();
  const [loaded, setLoaded] = useState(false);

  const [popupLocation, setPopupLocation] = useState(null);
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const locationSelect = useSelector(state =>
    mapSelectors.getLocationSelect(state),
  );

  const pointsOfConcern = useSelector(state =>
    pointsSelectors.getPoints(state),
  );

  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  const renderedPoints = filteredPoints.length
    ? filteredPoints
    : pointsOfConcern;

  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const editorMode = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
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

  const [viewport, setViewport] = useState({ ...initial, zoom: 10 });

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
      transitionDuration: 500,
    };

    setViewport(viewportCalc);
  };

  useEffect(() => {
    var zooming = {};

    if (!loaded) {
      return;
    }

    const pointsToZoom = selectedLocation
      ? [...renderedPoints, { ...selectedLocation, id: 'newLocation' }]
      : renderedPoints;

    const points = {
      type: 'FeatureCollection',
      features: pointsToZoom.map((point, index) => ({
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
          padding: 20,
          offset: [40, 40],
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
  }, [renderedPoints, loaded, selectedLocation]);

  useEffect(() => {
    if (!locationSelect && popupLocation) {
      setPopupLocation(null);
    }
  }, [locationSelect, popupLocation]);

  return (
    <div
      className={styles.map}
      style={{ pointerEvents: editorMode ? 'all' : 'none' }}
    >
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={defaultMapStyle}
        ref={mapRef}
        width="100%"
        height="100%"
        onLoad={onMapLoad}
        onViewportChange={viewportInternal => setViewport(viewportInternal)}
        onClick={({ rightButton, lngLat }) => {
          if (locationSelect && rightButton) {
            const [longitude, latitude] = lngLat;
            setPopupLocation({
              latitude,
              longitude,
            });
          } else {
            setPopupLocation(null);
          }
        }}
      >
        {editorMode && (
          <>
            {renderedPoints.map((p, i) => (
              <MapMarker {...p} key={i} />
            ))}

            {selectedLocation &&
              selectedLocation?.longitude &&
              selectedLocation?.latitude && (
                <MapMarker {...selectedLocation} alternate />
              )}

            {locationSelect &&
              popupLocation?.longitude &&
              popupLocation?.latitude && (
                <PopupWrapper {...popupLocation} type={appStatus} />
              )}

            <NavigationControl
              className={`mapboxgl-ctrl-bottom-right ${styles.mapCtrl}`}
              showCompass={false}
            />
          </>
        )}
      </ReactMapGL>
      <Notifications />
      {locationSelect ? <SelectionLocationHelp /> : <PointEditor />}
    </div>
  );
}
