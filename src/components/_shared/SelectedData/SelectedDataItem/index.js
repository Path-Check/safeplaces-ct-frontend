import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';

import {
  faMapMarkerAlt,
  faEllipsisV,
  faHourglass,
  faClock,
} from '@fortawesome/pro-solid-svg-icons';
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
import applicationSelectors from 'ducks/application/selectors';

import { formattedDuration } from 'components/_shared/SelectedData/SelectedDataItem/_helpers';

const SelectedDataItem = ({
  pointId,
  latitude,
  longitude,
  time: timestamp,
  duration,
}) => {
  const dispatch = useDispatch();
  const itemRef = useRef();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';
  const isHighlighted = activePoint ? activePoint.pointId === pointId : false;
  const [showContentMenu, setShowContentMenu] = useState(false);
  const date = moment(timestamp).format('ddd, MMMM D, YYYY');
  const time = moment(timestamp).format('h:mma');
  const classes = classNames({
    [`${selectedDataItem}`]: true,
    [`${selectedDataItemHighlighted}`]: isHighlighted,
  });
  const friendlyDuration = formattedDuration(duration);

  const handleClick = e => {
    dispatch(applicationActions.updateStatus(''));
    dispatch(mapActions.updateLocation(null));

    dispatch(
      pointsActions.setSelectedPoint({
        pointId,
        latitude,
        longitude,
        time: timestamp,
        duration,
      }),
    );

    if (!isTrace) {
      return;
    }

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

  useEffect(() => {
    if (!isHighlighted) {
      setShowContentMenu(false);
    }
  }, [isHighlighted]);

  return (
    <div className={classes}>
      <button type="button" onClick={handleClick} ref={itemRef}>
        <FontAwesomeIcon className={selectedDataIcon} icon={faMapMarkerAlt} />
        <div className={selectedDataContent}>
          <h6>{date}</h6>
          <ul>
            <li>
              <FontAwesomeIcon icon={faClock} /> {time}
            </li>
            {friendlyDuration && (
              <li>
                <FontAwesomeIcon icon={faHourglass} /> {friendlyDuration}
              </li>
            )}
          </ul>
        </div>
        {isTrace && (
          <div className={selectedDataMenuAction} type="button">
            <FontAwesomeIcon icon={faEllipsisV} />
          </div>
        )}
      </button>
      {showContentMenu && isHighlighted && (
        <PointContextMenu
          {...activePoint}
          renderDateTime={false}
          duration={friendlyDuration}
          closeAction={() => setShowContentMenu(false)}
        />
      )}
    </div>
  );
};

SelectedDataItem.propTypes = {
  id: PropTypes.number,
  latLng: PropTypes.array,
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.number,
  selectedItem: PropTypes.string,
};

export default SelectedDataItem;
