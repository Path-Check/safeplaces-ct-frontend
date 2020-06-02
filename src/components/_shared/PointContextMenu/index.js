import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  pointContextMenu,
  pointContextMenuClose,
} from './PointContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faTrash,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import { useDispatch } from 'react-redux';
import pointsActions from 'ducks/points/actions';

const PointContextMenu = ({
  id,
  closeAction,
  deleteAction,
  editAction,
  deselectAction,
}) => {
  const containerRef = useRef();
  const dispatch = useDispatch();

  const handleClick = e => {
    const _Target = e.target;

    if (!containerRef.current) return;

    if (!containerRef.current.contains(_Target)) {
      closeAction();
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleClick);

    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div className={pointContextMenu} ref={containerRef}>
      <button
        className={pointContextMenuClose}
        type="button"
        onClick={closeAction}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ul>
        {/* <li>
          <button type="button" onClick={() => deleteAction(id)}>
            <FontAwesomeIcon icon={faEdit} />
            Edit
          </button>
        </li>
        <li>
          <button type="button" onClick={() => editAction(id)}>
            <FontAwesomeIcon icon={faMinusCircle} />
            Unselect
          </button>
        </li> */}
        <li>
          <button
            type="button"
            onClick={() => dispatch(pointsActions.deletePoint(id))}
          >
            <FontAwesomeIcon icon={faTrash} />
            Delete
          </button>
        </li>
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
