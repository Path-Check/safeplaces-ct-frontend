import React, { useState, useEffect, useRef } from 'react';
import ReactMapGL, { WebMercatorViewport } from 'react-map-gl';

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
  returnViewportConfig,
  returnCursor,
  renderDrawingTools,
} from 'components/_shared/Map/_helpers';

import pointsActions from 'ducks/points/actions';
import MapControls from 'components/_shared/Map/MapControls';

const MapInner = React.memo(({ filteredPoints, geoPoints }) => {
  const dispatch = useDispatch();
  const mapRef = useRef();
  const map = mapRef?.current?.getMap();

  const [loaded, setLoaded] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [popupLocation, setPopupLocation] = useState(null);
  const [satelliteView, setSatelliteView] = useState(false);
  const [showContentMenu, setShowContentMenu] = useState(false);
  const [focused, setfocused] = useState(false);
  const [viewport, setViewport] = useState({ ...initial, zoom: 10 });

  const { activePoint, duration, recordIds, dateRange } = useSelector(
    state => state.points,
  );

  const { location: selectedLocation, locationSelect } = useSelector(
    state => state.map,
  );

  const {
    status: appStatus,
    renderEditor: editorMode,
    mode: viewMode,
  } = useSelector(state => state.application);

  const boundsObject = useSelector(state => authSelectors.getBounds(state));
  const pointsLength = filteredPoints?.length;
  const renderLocationHelp =
    appStatus === 'EDIT POINT' || appStatus === 'ADD POINT';
  const cursorStyle = returnCursor(locationSelect, isDragging);
  const renderDrawTools = renderDrawingTools(viewMode, appStatus, pointsLength);

  const initial = returnViewportConfig(boundsObject);

  const onMapLoad = e => {
    setLoaded(true);

    const focused = returnViewportConfig(
      boundsObject,
      mapRef.current._width,
      mapRef.current._height,
    );

    const viewportCalc = {
      ...viewport,
      ...focused,
      transitionDuration: 500,
    };

    setViewport(viewportCalc);
  };

  const snapToBounds = () => {
    let zooming = {};

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
  };

  useEffect(() => {
    snapToBounds();
  }, [duration, recordIds, dateRange]);

  useEffect(() => {
    let zooming = {};

    if (focused) {
      return;
    }

    snapToBounds();

    if (filteredPoints.length) {
      setfocused(true);
    }
  }, [filteredPoints.length]);

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
    if (!map) return;

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

    if (!point || !point.properties?.id) return;

    dispatch(pointsActions.setSelectedPoint({ ...point.properties }));

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
        {editorMode && pointsLength > 0 && (
          <>
            <MapSource geoPoints={geoPoints} />
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
            <MapControls
              setSatelliteView={setSatelliteView}
              satelliteView={satelliteView}
            />
          </>
        )}
      </ReactMapGL>
      {renderLocationHelp && <SelectionLocationHelp />}
    </div>
  );
});

export default MapInner;
