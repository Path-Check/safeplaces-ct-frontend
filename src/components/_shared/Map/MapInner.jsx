import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, {
  NavigationControl,
  WebMercatorViewport,
  ScaleControl,
} from 'react-map-gl';

import LocationSelect from './LocationSelect';

import { useSelector, useDispatch } from 'react-redux';

import styles from './styles.module.scss';
import getBounds from 'components/_shared/Map/getBounds';

import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';

import applicationSelectors from 'ducks/application/selectors';
import mapSelectors from 'ducks/map/selectors';
import SelectionLocationHelp from 'components/_shared/Map/SelectionLocationHelp';
import DrawEditor from 'components/_shared/Map/DrawEditor';

import satelliteStyles from './styles/satellite.json';
import mapStyles from './styles/map.json';

import PointContextMenu from 'components/_shared/PointContextMenu';
import MapSource from 'components/_shared/Map/MapSource';
import {
  returnGeoPoints,
  fallbackViewport,
} from 'components/_shared/Map/_helpers';

import SatelliteToggle from 'components/_shared/Map/SatelliteToggle';
import pointsActions from 'ducks/points/actions';

const MapInner = React.memo(({ filteredPoints, geoPoints }) => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const map = mapRef?.current?.getMap();
  const {
    activePoint,
    duration,
    geometry,
    recordIds,
    singleDate,
  } = useSelector(state => state.points);

  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const locationSelect = useSelector(state =>
    mapSelectors.getLocationSelect(state),
  );

  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const editorMode = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const viewMode = useSelector(state => applicationSelectors.getMode(state));
  const boundsObject = useSelector(state => authSelectors.getBounds(state));

  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [popupLocation, setPopupLocation] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);
  const [showContentMenu, setShowContentMenu] = useState(false);

  const cursorStyle = locationSelect
    ? isDragging
      ? 'grab'
      : 'crosshair'
    : isDragging
    ? 'grab'
    : 'inherit';

  const renderDrawTools =
    viewMode === 'trace' &&
    appStatus !== 'EDIT POINT' &&
    appStatus !== 'ADD POINT' &&
    filteredPoints?.length > 1;

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

    const pointsToZoom = selectedLocation
      ? returnGeoPoints([
          ...filteredPoints,
          { ...selectedLocation, id: 'newLocation' },
        ])
      : geoPoints;

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
  }, [filteredPoints.length, duration, recordIds, singleDate, loaded]);

  useEffect(() => {
    if (!locationSelect && popupLocation) {
      setPopupLocation(null);
    }
  }, [locationSelect, popupLocation]);

  useEffect(() => {
    resetActivePoints();

    if (!map || !activePoint) return;

    map.setFeatureState(
      {
        source: 'point',
        id: activePoint.id,
      },
      {
        activePoint: true,
      },
    );
  }, [activePoint?.id]);

  const handleClick = (rightButton, lngLat, features) => {
    if (locationSelect && rightButton) {
      const [longitude, latitude] = lngLat;
      setPopupLocation({
        latitude,
        longitude,
      });
    } else {
      if (!features || features.length < 1) {
        return;
      }

      handleSelection(features);
    }
  };

  const resetActivePoints = () => {
    filteredPoints.forEach(f => {
      map.setFeatureState(
        {
          source: 'point',
          id: f.id,
        },
        {
          activePoint: false,
        },
      );
    });
  };

  const handleSelection = features => {
    const point = features[0];

    if (!point.properties.id) return;

    dispatch(pointsActions.setSelectedPoint(point.properties));

    setShowContentMenu(true);
  };

  return (
    <div
      className={styles.map}
      style={{
        pointerEvents: editorMode ? 'all' : 'none',
        cursor: cursorStyle,
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
        onClick={({ rightButton, lngLat, features }) =>
          handleClick(rightButton, lngLat, features)
        }
      >
        {editorMode && (
          <>
            <ScaleControl maxWidth={100} unit={'metric'} />

            {filteredPoints?.length > 0 && <MapSource geoPoints={geoPoints} />}

            {showContentMenu && (
              <PointContextMenu
                renderDateTime
                bottom
                {...activePoint}
                closeAction={() => {
                  setShowContentMenu(false);
                  resetActivePoints();
                }}
              />
            )}

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

            {renderDrawTools && <DrawEditor filteredPoints={filteredPoints} />}

            <div className={styles.controls}>
              <NavigationControl
                className={`${styles.mapCtrl}`}
                showCompass={false}
              />
              <SatelliteToggle
                setSatelliteView={setSatelliteView}
                satelliteView={satelliteView}
              />
            </div>
          </>
        )}
      </ReactMapGL>
      {(appStatus === 'EDIT POINT' || appStatus === 'ADD POINT') && (
        <SelectionLocationHelp />
      )}
    </div>
  );
});

export default MapInner;
