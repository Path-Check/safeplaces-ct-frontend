import React from 'react';
import { Marker } from 'react-map-gl';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

import { marker } from './Marker.module.scss';

const MapMarker = ({ latitude, longitude }) => {
  console.log(latitude, longitude);

  return (
    <Marker className={marker} latitude={latitude} longitude={longitude}>
      <button onClick={() => console.log('clicked')}>
        <FontAwesomeIcon icon={faMapMarkerAlt} style={{ fontSize: '30px' }} />
      </button>
    </Marker>
  );
};

export default MapMarker;
