import React, { useState, useRef, useEffect } from 'react';
import { Marker } from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/pro-solid-svg-icons';

import classNames from 'classnames';

import {
  marker,
  markerAlt,
  markerExpanded,
  markerIcon,
} from './Marker.module.scss';

import PointContextMenu from 'components/_shared/PointContextMenu';

import pointsSelectors from 'ducks/points/selectors';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import { formattedDuration } from 'components/_shared/SelectedData/SelectedDataItem/_helpers';

const MapMarker = ({
  latitude,
  longitude,
  time: timestamp,
  duration,
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

  const friendlyDuration = formattedDuration(duration);

  const handleClick = e => {
    dispatch(applicationActions.updateStatus(''));

    dispatch(
      pointsActions.setSelectedPoint({
        pointId,
        latitude,
        longitude,
        time: timestamp,
        duration,
      }),
    );

    setShowContentMenu(!showContentMenu);
  };

  useEffect(() => {
    if (!activePoint) {
      setShowContentMenu(false);
    }
  }, [activePoint]);

  const classes = classNames({
    [`${marker}`]: true,
    [`${markerAlt}`]: alternate,
    [`${markerExpanded}`]: isHighlighted || alternate,
  });

  return (
    <Marker className={classes} latitude={latitude} longitude={longitude}>
      <button onClick={handleClick} ref={markerRef}>
        <FontAwesomeIcon icon={faMapMarkerAlt} className={markerIcon} />
      </button>
      {showContentMenu && !alternate && (
        <PointContextMenu
          renderDateTime
          bottom
          duration={friendlyDuration}
          {...activePoint}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </Marker>
  );
};

export default MapMarker;
