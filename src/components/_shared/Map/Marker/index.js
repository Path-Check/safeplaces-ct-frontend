import React, { useState } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

import { marker } from './Marker.module.scss';

import PointContextMenu from 'components/_shared/PointContextMenu';

import pointsSelectors from 'ducks/points/selectors';
import pointsActions from 'ducks/points/actions';

const MapMarker = ({ latitude, longitude, pointId }) => {
  const dispatch = useDispatch();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const isHighlighted = activePoint === pointId;

  const [showContentMenu, setShowContentMenu] = useState(false);

  const handleClick = () => {
    dispatch(pointsActions.setSelectedPoint(pointId));
    setShowContentMenu(!showContentMenu);
  };

  return (
    <Marker className={marker} latitude={latitude} longitude={longitude}>
      <button onClick={handleClick}>
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
          time={pointId}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
