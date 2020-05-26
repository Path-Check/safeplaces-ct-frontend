import React, { useState, useEffect, useRef } from 'react';

import { setMapCoordinate } from 'ducks/map';
import { useSelector, useDispatch } from 'react-redux';

import ReactMapGL, { NavigationControl } from 'react-map-gl';

import Track from './trackPath';

import { addSelected } from '../../../ducks/selectedPoints';
import { getFilteredTrackPath } from '../../../selectors';
import Popup from './Popup';

import styles from './styles.module.scss';

import defaultMapStyleJson from './style.json';
import { defaultMapStyle } from 'components/_shared/Map/config';

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
  const trackPath = useSelector(getFilteredTrackPath);

  useEffect(() => {
    // const historyMapData = Track({
    //   trackPath: trackPath,
    // });
    // console.log('style updated');
    // var zooming = {};
    // if (trackPath) {
    //   const { points, lines } = historyMapData;
    //   const mapStyleUpdate = mapStyle
    //     .setIn(
    //       ['sources', 'lines'],
    //       fromJS({ type: 'geojson', lineMetrics: true, data: lines }),
    //     )
    //     .setIn(
    //       ['sources', 'points'],
    //       fromJS({ type: 'geojson', data: points }),
    //     );
    //   if (JSON.stringify(mapStyleUpdate) !== JSON.stringify(mapStyle)) {
    //     setMapStyle(mapStyleUpdate);
    //     const bounds = getBounds(points);
    //     const mapObject = document.getElementsByClassName('map')[0];
    //     if (bounds && mapObject) {
    //       zooming = new WebMercatorViewport({
    //         width: mapRef.current._width, // mapObject.offsetWidth,
    //         height: mapRef.current._height, // mapObject.offsetHeight
    //       }).fitBounds(bounds, {
    //         padding: 50,
    //         offset: [0, 0],
    //       });
    //     }
    //     const viewportCalc = {
    //       ...viewport,
    //       ...zooming,
    //       transitionDuration: 500,
    //     };
    //     if (JSON.stringify(viewport) !== JSON.stringify(viewportCalc)) {
    //       setViewport(viewportCalc);
    //     }
    //   }
    // }
  }, [mapStyle, trackPath, viewport]);

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

  const onMapClick = e => {
    console.log(e);
    var bbox = [
      [e.point[0] - 1, e.point[1] - 1],
      [e.point[0] + 1, e.point[1] + 1],
    ];

    dispatch(setMapCoordinate(e.lngLat));
    var features = mapRef.current.queryRenderedFeatures(bbox, {
      layers: ['pointLayer'],
    });

    console.log('map clicked', mapRef.current, features);
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
      onClick={onMapClick}
      onLoad={onMapLoad}
      onViewportChange={viewportInternal => setViewport(viewportInternal)}
    >
      {/* <NavigationControl
        className={`mapboxgl-ctrl-bottom-left ${styles.mapCtrl}`}
      /> */}
      <Popup />
      <Track />
    </ReactMapGL>
  );
}
