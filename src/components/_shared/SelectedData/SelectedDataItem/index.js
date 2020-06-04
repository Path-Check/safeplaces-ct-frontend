import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';

import { faMapMarkerAlt, faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectedDataItem,
  selectedDataItemHighlighted,
  selectedDataIcon,
  selectedDataContent,
  selectedDataMenuAction,
} from './SelectedDataItem.module.scss';

import PointContextMenu from 'components/_shared/PointContextMenu';
import pointsActions from 'ducks/points/actions';
import { useDispatch, useSelector } from 'react-redux';

import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';
import mapActions from 'ducks/map/actions';

const SelectedDataItem = ({
  pointId,
  latitude,
  longitude,
  time: timestamp,
}) => {
  const dispatch = useDispatch();
  const itemRef = useRef();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );

  const isHighlighted = activePoint?.pointId === pointId;
  const [showContentMenu, setShowContentMenu] = useState(false);

  const date = moment(timestamp).format('ddd, MMMM D, YYYY');
  const time = moment(timestamp).format('hh:mm');

  const classes = classNames({
    [`${selectedDataItem}`]: true,
    [`${selectedDataItemHighlighted}`]: isHighlighted,
  });

  const handleClick = e => {
    dispatch(applicationActions.updateStatus(''));
    dispatch(mapActions.updateLocation(null));

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

  useEffect(() => {
    if (showContentMenu) {
      itemRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }, [showContentMenu]);

  return (
    <div className={classes}>
      <button type="button" onClick={handleClick} ref={itemRef}>
        <FontAwesomeIcon className={selectedDataIcon} icon={faMapMarkerAlt} />
        <div className={selectedDataContent}>
          <h6>{date}</h6>
          <ul>
            <li>{time}</li>
            {/* <li>{travelling ? 'Travelling' : duration}</li> */}
          </ul>
        </div>
        <div className={selectedDataMenuAction} type="button">
          <FontAwesomeIcon icon={faEllipsisV} />
        </div>
      </button>
      {showContentMenu && (
        <PointContextMenu
          {...activePoint}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </div>
  );
};

SelectedDataItem.propTypes = {
  id: PropTypes.string,
  latLng: PropTypes.array,
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.bool,
  travelling: PropTypes.string,
  selectedItem: PropTypes.string,
};

export default SelectedDataItem;
