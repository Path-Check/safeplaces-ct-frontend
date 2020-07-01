import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import moment from 'moment';

import {
  pointContextMenu,
  pointContextMenuHeader,
  pointContextMenuClose,
  pointContextMenuBottom,
  pointContextMenuOption,
} from './PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faCalendarAlt,
  faClock,
  faTrash,
  faTimes,
  faChevronRight,
  faHourglass,
  faTag,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import pointsActions from 'ducks/points/actions';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';
import { formattedDuration } from 'components/_shared/SelectedData/SelectedDataItem/_helpers';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import LabelAs from 'components/_shared/PointContextMenu/LabelAs';

const PointContextMenu = ({
  pointId: id,
  closeAction,
  time: timestamp,
  duration,
  latitude,
  longitude,
  nickname,
  renderDateTime = true,
  bottom,
}) => {
  const classes = classNames({
    [`${pointContextMenu}`]: true,
    [`${pointContextMenuBottom}`]: bottom,
  });

  const containerRef = useRef();
  const dispatch = useDispatch();
  const [showLabelAs, setShowLabelAs] = useState(false);
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';
  const date = moment(timestamp).format('MMMM D, YYYY');
  const time = moment(timestamp).format('h:mma');

  useOnClickOutside(containerRef, () => closeAction());

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
              <FontAwesomeIcon icon={faHourglass} />{' '}
              {formattedDuration(duration)}
            </li>
          )}
          {nickname && (
            <li>
              <FontAwesomeIcon icon={faTag} /> {nickname}
            </li>
          )}
        </ul>
      )}
      <ul>
        {isTrace && (
          <li className={pointContextMenuOption}>
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
        {renderDateTime && (
          <li className={pointContextMenuOption}>
            <button type="button" onClick={() => setShowLabelAs(true)}>
              <FontAwesomeIcon icon={faTag} />
              Label as <FontAwesomeIcon icon={faChevronRight} />
            </button>
            {showLabelAs && (
              <LabelAs
                currentNickname={nickname}
                points={[id]}
                closeCallback={() => closeAction()}
              />
            )}
          </li>
        )}
        {isTrace && (
          <li className={pointContextMenuOption}>
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
