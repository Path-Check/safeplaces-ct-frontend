import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import moment from 'moment';

import {
  faHourglass,
  faClock,
  faTag,
  faTrash,
  faEdit,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectedDataItem,
  selectedDataItemHighlighted,
  selectedDataContent,
  SelectedDataItemActions,
} from './SelectedDataItem.module.scss';

import pointsActions from 'ducks/points/actions';
import { useDispatch, useSelector } from 'react-redux';

import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';
import mapActions from 'ducks/map/actions';
import { formattedDuration } from 'helpers/dateTime';

const SelectedDataItem = ({
  pointId,
  latitude,
  longitude,
  time: timestamp,
  duration,
  nickname,
}) => {
  const dispatch = useDispatch();
  const itemRef = useRef();
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const isHighlighted = activePoint?.pointId === pointId;
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
    e.preventDefault();

    if (isHighlighted) {
      dispatch(pointsActions.setSelectedPoint(null));
    } else {
      dispatch(
        pointsActions.setSelectedPoint({
          pointId,
          latitude,
          longitude,
          time: timestamp,
          duration,
        }),
      );
    }
  };

  return (
    <li className={classes}>
      <button type="button" onClick={handleClick} ref={itemRef}>
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
            {nickname && (
              <li>
                <FontAwesomeIcon icon={faTag} /> {nickname}
              </li>
            )}
          </ul>
        </div>
      </button>
      {isHighlighted && (
        <ul className={SelectedDataItemActions}>
          <li>
            <button
              type="button"
              onClick={() =>
                dispatch(applicationActions.updateStatus('EDIT POINT'))
              }
              title="Edit Item"
            >
              <FontAwesomeIcon icon={faEdit} />
            </button>
          </li>
          {/* <li>
            <button type="button" onClick={() => setShowLabelAs(true)}>
              <FontAwesomeIcon icon={faTag} title="Label as " />
            </button>
            {showLabelAs && (
              <LabelAs
                currentNickname={nickname}
                points={[id]}
                closeCallback={() => closeAction()}
              />
            )}
          </li> */}
          <li>
            <button
              type="button"
              title="Delete Item"
              onClick={() => dispatch(pointsActions.deletePoint(pointId))}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </li>
        </ul>
      )}
    </li>
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
