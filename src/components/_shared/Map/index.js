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
import casesSelectors from 'ducks/cases/selectors';

import Notifications from 'components/_global/Notifications';
import MapMarker from 'components/_shared/Map/Marker';
import authSelectors from 'ducks/auth/selectors';
import pointsSelectors from 'ducks/points/selectors';
import PointEditor from 'components/PointEditor';
import applicationSelectors from 'ducks/application/selectors';
import mapSelectors from 'ducks/map/selectors';

export default function Map({ setMap }) {
  const mapRef = useRef();
  const [loaded, setLoaded] = useState(false);
  const [renderLocationSelect, setRenderLocationSelect] = useState(false);
  const [popupLocation, setPopupLocation] = useState(null);

  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );
  const pointsOfConcern = useSelector(state =>
    pointsSelectors.getPoints(state),
  );

  const boundsObject = useSelector(state => authSelectors.getBounds(state));
  const bounds = [
    [boundsObject.sw.longitude, boundsObject.sw.latitude],
    [boundsObject.ne.longitude, boundsObject.ne.latitude],
  ];
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const editorMode = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const isEdit = appStatus === 'EDIT POINT';
  const isAdd = appStatus === 'ADD POINT';
  const selectLocation = appStatus === 'SELECT LOCATION';
  const renderPointsEditor = isEdit || isAdd;

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

    console.log(selectedLocation);

    const pointsToZoom = selectedLocation
      ? [...pointsOfConcern, { ...selectedLocation, id: 'newLocation' }]
      : pointsOfConcern;

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
          padding: 40,
          offset: [350, 200],
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
  }, [pointsOfConcern, loaded, selectedLocation]);

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
        onClick={map => {
          if (map.rightButton) {
            setPopupLocation({
              latitude: map.lngLat[1],
              longitude: map.lngLat[0],
            });
            setRenderLocationSelect(true);
          } else {
            setRenderLocationSelect(false);
            setPopupLocation(null);
          }
        }}
      >
        {editorMode && (
          <>
            {pointsOfConcern.map(p => (
              <MapMarker {...p} key={p.pointId} />
            ))}

            {selectedLocation && <MapMarker {...selectedLocation} alternate />}

            {renderLocationSelect && appStatus === 'SELECT LOCATION' && (
              <PopupWrapper {...popupLocation} type={appStatus} />
            )}

            <NavigationControl
              className={`mapboxgl-ctrl-bottom-right ${styles.mapCtrl}`}
              showCompass={false}
            />
            <Notifications />
            {renderPointsEditor && (
              <PointEditor appStatus={appStatus} isEdit={isEdit} />
            )}
            {selectLocation && <div>Select Location</div>}
          </>
        )}
      </ReactMapGL>
    </div>
  );
}
