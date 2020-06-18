import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
  ScaleControl,
} from 'react-map-gl';
import PopupWrapper from './Popup';

import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import { defaultMapStyle } from 'components/_shared/Map/config';

import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';
import PointEditor from 'components/PointEditor';
import applicationSelectors from 'ducks/application/selectors';
import mapSelectors from 'ducks/map/selectors';
import SelectionLocationHelp from 'components/_shared/Map/SelectionLocationHelp';
import { returnGeoPoints } from 'components/_shared/Map/_helpers';

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

  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  const singleDate = useSelector(state => pointsSelectors.getSingleDate(state));
  const dateRange = useSelector(state => pointsSelectors.getDateRange(state));
  const duration = useSelector(state => pointsSelectors.getDuration(state));
  const useDuration = useSelector(state =>
    pointsSelectors.getUseDurationFilter(state),
  );

  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const renderPointEditor =
    appStatus === 'EDIT POINT' || appStatus === 'ADD POINT';
  const editorMode = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );

  const fallbackViewport = {
    latitude: 37.7577,
    longitude: -122.4376,
  };

  const boundsObject = useSelector(state => authSelectors.getBounds(state));
  const withBounds =
    boundsObject?.sw?.longitude &&
    boundsObject?.sw?.latitude &&
    boundsObject?.ne?.longitude &&
    boundsObject?.ne?.latitude;

  const initial = withBounds
    ? new WebMercatorViewport({
      width: 600,
      height: 600,
    }).fitBounds([
      [boundsObject.sw.longitude, boundsObject.sw.latitude],
      [boundsObject.ne.longitude, boundsObject.ne.latitude],
    ])
    : fallbackViewport;

  const [viewport, setViewport] = useState({ ...initial, zoom: 10 });

  const onMapLoad = e => {
    setLoaded(true);

    const focused = withBounds
      ? new WebMercatorViewport({
        width: mapRef.current._width,
        height: mapRef.current._height,
      }).fitBounds([
        [boundsObject.sw.longitude, boundsObject.sw.latitude],
        [boundsObject.ne.longitude, boundsObject.ne.latitude],
      ])
      : fallbackViewport;

    const viewportCalc = {
      ...viewport,
      ...focused,
      transitionDuration: 500,
    };

    setViewport(viewportCalc);
  };

  useEffect(() => {
    let zooming = {};

    if (!loaded) {
      return;
    }

    const pointsToZoom = returnGeoPoints(
      selectedLocation
        ? [...filteredPoints, { ...selectedLocation, id: 'newLocation' }]
        : filteredPoints,
    );

    const bounds = getBounds(pointsToZoom);

    if (bounds) {
      zooming = new WebMercatorViewport({
        width: mapRef.current._width, // mapObject.offsetWidth,
        height: mapRef.current._height, // mapObject.offsetHeight
      }).fitBounds(bounds, {
        offset: [20, 20],
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

    console.log('filteredPoints')
    console.log(filteredPoints)
  }, [
    filteredPoints.length,
    dateRange,
    duration,
    singleDate,
    useDuration,
    loaded,
    selectedLocation,
  ]);

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
        <ScaleControl maxWidth={100} unit={'metric'} />
        {editorMode && (
          <>
            {filteredPoints.map((p, i) => (
              <MapMarker {...p} key={i} />
            ))}

            {selectedLocation?.longitude && selectedLocation?.latitude && (
              <MapMarker {...selectedLocation} alternate />
            )}

            {popupLocation?.longitude && popupLocation?.latitude && (
              <PopupWrapper {...popupLocation} type={appStatus} />
            )}

            <NavigationControl
              className={`mapboxgl-ctrl-bottom-right ${styles.mapCtrl}`}
              showCompass={false}
            />
          </>
        )}
      </ReactMapGL>
      {locationSelect ? (
        <SelectionLocationHelp />
      ) : renderPointEditor ? (
        <PointEditor isEdit={appStatus === 'EDIT POINT'} />
      ) : null}
    </div>
  );
}
