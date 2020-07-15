import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
  ScaleControl,
} from 'react-map-gl';

import LocationSelect from './LocationSelect';

import { useSelector } from 'react-redux';

import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';

import applicationSelectors from 'ducks/application/selectors';
import mapSelectors from 'ducks/map/selectors';
import SelectionLocationHelp from 'components/_shared/Map/SelectionLocationHelp';
import DrawEditor from 'components/_shared/Map/DrawEditor';

import { returnGeoPoints } from 'components/_shared/Map/_helpers';

import satelliteStyles from './styles/satellite.json';
import mapStyles from './styles/map.json';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMap, faSatellite } from '@fortawesome/pro-solid-svg-icons';

export default function Map({ setMap }) {
  const mapRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const [popupLocation, setPopupLocation] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);
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
  const editorMode = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const viewMode = useSelector(state => applicationSelectors.getMode(state));

  const renderDrawTools =
    viewMode === 'trace' &&
    appStatus !== 'EDIT POINT' &&
    appStatus !== 'ADD POINT' &&
    filteredPoints?.length > 1;

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
      style={{
        pointerEvents: editorMode ? 'all' : 'none',
        cursor: locationSelect
          ? isDragging
            ? 'grab'
            : 'crosshair'
          : isDragging
          ? 'grab'
          : 'inherit',
      }}
    >
      <ReactMapGL
        {...viewport}
        mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_KEY}
        mapStyle={satelliteView ? satelliteStyles : mapStyles}
        ref={mapRef}
        width="100%"
        height="100%"
        getCursor={({ isDragging, isHovering }) => setIsDragging(isDragging)}
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
            <ScaleControl maxWidth={100} unit={'metric'} />
            {filteredPoints.map((p, i) => (
              <MapMarker {...p} key={`map-point-${p.id}`} />
            ))}

            {selectedLocation?.longitude && selectedLocation?.latitude && (
              <MapMarker {...selectedLocation} alternate />
            )}

            {popupLocation?.longitude && popupLocation?.latitude && (
              <LocationSelect
                {...popupLocation}
                setPopupLocation={setPopupLocation}
                type={appStatus}
              />
            )}

            {renderDrawTools && <DrawEditor />}

            <div className={styles.controls}>
              <NavigationControl
                className={`${styles.mapCtrl}`}
                showCompass={false}
              />
              <button
                className={styles.viewToggle}
                onClick={() => setSatelliteView(!satelliteView)}
                title={`Enable ${!satelliteView ? 'Satellite' : 'Map'} View`}
              >
                <FontAwesomeIcon icon={satelliteView ? faMap : faSatellite} />
              </button>
            </div>
          </>
        )}
      </ReactMapGL>
      {(appStatus === 'EDIT POINT' || appStatus === 'ADD POINT') && (
        <SelectionLocationHelp />
      )}
    </div>
  );
}
