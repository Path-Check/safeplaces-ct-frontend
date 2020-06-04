import React, { useState, useRef } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

import classNames from 'classnames';

import { marker, markerAlt, markerExpanded } from './Marker.module.scss';

import PointContextMenu from 'components/_shared/PointContextMenu';

import pointsSelectors from 'ducks/points/selectors';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';

const MapMarker = ({
  latitude,
  longitude,
  time: timestamp,
  pointId,
  alternate,
}) => {
  const dispatch = useDispatch();
  const markerRef = useRef();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const isHighlighted = activePoint ? activePoint.pointId === pointId : false;
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

  const classes = classNames({
    [`${marker}`]: true,
    [`${markerAlt}`]: alternate,
    [`${markerExpanded}`]: isHighlighted || alternate,
  });

  return (
    <Marker className={classes} latitude={latitude} longitude={longitude}>
      <button onClick={handleClick} ref={markerRef}>
        <FontAwesomeIcon icon={faMapMarkerAlt} />
      </button>
      {showContentMenu && !alternate && (
        <PointContextMenu
          renderDateTime
          {...activePoint}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
