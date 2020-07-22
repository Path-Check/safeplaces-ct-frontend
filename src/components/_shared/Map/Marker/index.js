import React from 'react';
import { Marker } from 'react-map-gl';

import classNames from 'classnames';

import {
  marker,
  markerAlt,
  markerExpanded,
  markerIcon,
} from './Marker.module.scss';

const MapMarker = ({
  latitude,
  longitude,
  time: timestamp,
  duration,
  pointId,
  alternate,
  nickname,
}) => {
  const classes = classNames({
    [`${marker}`]: true,
    [`${markerAlt}`]: alternate,
    [`${markerExpanded}`]: alternate,
  });

  return (
    <>
      <Marker className={classes} latitude={latitude} longitude={longitude}>
        <span className={markerIcon} />
      </Marker>
    </>
  );
};

export default MapMarker;
