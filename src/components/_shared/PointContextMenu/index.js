import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import moment from 'moment';

import {
  pointContextMenu,
  pointContextMenuHeader,
  pointContextMenuClose,
  pointContextMenuBottom,
} from './PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faCalendarAlt,
  faClock,
  faTrash,
  faTimes,
  faHourglass,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

const PointContextMenu = ({
  pointId: id,
  closeAction,
  time: timestamp,
  duration,
  latitude,
  longitude,
  renderDateTime = true,
  bottom,
}) => {
  const classes = classNames({
    [`${pointContextMenu}`]: true,
    [`${pointContextMenuBottom}`]: bottom,
  });

  const containerRef = useRef();
  const dispatch = useDispatch();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';
  const date = moment(timestamp).format('MMMM D, YYYY');
  const time = moment(timestamp).format('h:mma');

  const handleClick = e => {
    const _Target = e.target;

    if (!containerRef.current) return;

    if (!containerRef.current.contains(_Target)) {
      closeAction();
      // dispatch(applicationActions.updateStatus(''));
      // dispatch(pointsActions.setSelectedPoint(null));
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  if (appStatus === 'EDIT POINT') {
    return null;
  }

  return (
    <div className={classes} ref={containerRef}>
      <button
        className={pointContextMenuClose}
        type="button"
        onClick={() => {
          closeAction();
          dispatch(applicationActions.updateStatus(''));
          dispatch(pointsActions.setSelectedPoint(null));
        }}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      {renderDateTime && (
        <ul className={pointContextMenuHeader}>
          <li>
            <FontAwesomeIcon icon={faCalendarAlt} /> {date}
          </li>
          <li>
            <FontAwesomeIcon icon={faClock} /> {time}
          </li>
          {duration && (
            <li>
              <FontAwesomeIcon icon={faHourglass} /> {duration}
            </li>
          )}
        </ul>
      )}
      <ul>
        {/* <li>
          <button type="button" onClick={() => console.log('oi oi')}>
            <FontAwesomeIcon icon={faMinusCircle} />
            Unselect
          </button>
        </li> */}
        {isTrace && (
          <li>
            <button
              type="button"
              onClick={() =>
                dispatch(applicationActions.updateStatus('EDIT POINT'))
              }
            >
              <FontAwesomeIcon icon={faEdit} />
              Edit
            </button>
          </li>
        )}
        {isTrace && (
          <li>
            <button
              type="button"
              onClick={() => dispatch(pointsActions.deletePoint(id))}
            >
              <FontAwesomeIcon icon={faTrash} />
              Delete
            </button>
          </li>
        )}
      </ul>
    </div>
  );
};

PointContextMenu.propTypes = {
  deleteAction: PropTypes.func,
  editAction: PropTypes.func,
  deselectAction: PropTypes.func,
};

export default PointContextMenu;
