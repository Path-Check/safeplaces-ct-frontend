import React, { useState, useRef } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

import { marker } from './Marker.module.scss';

import PointContextMenu from 'components/_shared/PointContextMenu';

import pointsSelectors from 'ducks/points/selectors';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';

const MapMarker = ({ latitude, longitude, time: timestamp, pointId }) => {
  const dispatch = useDispatch();
  const markerRef = useRef();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const isHighlighted = activePoint?.pointId === pointId;

  const [showContentMenu, setShowContentMenu] = useState(false);

  const handleClick = e => {
    dispatch(applicationActions.updateStatus(''));

    dispatch(
      pointsActions.setSelectedPoint({
        pointId,
        latitude,
        longitude,
        time: timestamp,
      }),
    );
    setShowContentMenu(!showContentMenu);
  };

  return (
    <Marker className={marker} latitude={latitude} longitude={longitude}>
      <button onClick={handleClick} ref={markerRef}>
        <FontAwesomeIcon
          icon={faMapMarkerAlt}
          style={{
            fontSize: isHighlighted ? '40px' : '30px',
            color: '#ff5656',
          }}
        />
      </button>
      {showContentMenu && (
        <PointContextMenu
          id={pointId}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
