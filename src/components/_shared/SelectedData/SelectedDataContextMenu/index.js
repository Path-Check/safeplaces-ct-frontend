import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  selectedDataContextMenu,
  selectedDataContextMenuClose,
} from './SelectedDataContextMenu.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEdit,
  faMinusCircle,
  faTrash,
  faPlus,
  faTimes,
} from '@fortawesome/pro-solid-svg-icons';
import applicationActions from 'ducks/application/actions';
import { useDispatch } from 'react-redux';

const SelectedDataContextMenu = ({
  closeAction,
  addAction,
  deleteAllAction,
  pointsLength,
  deselectAllAction,
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
    <div className={selectedDataContextMenu} ref={containerRef}>
      <button
        className={selectedDataContextMenuClose}
        type="button"
        onClick={closeAction}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <ul>
        <li>
          <button
            type="button"
            onClick={() =>
              dispatch(applicationActions.updateStatus('ADD POINT'))
            }
          >
            <FontAwesomeIcon icon={faPlus} />
            Add Data point
          </button>
        </li>
        {pointsLength > 0 && (
          <>
            {/* <li>
              <button type="button" onClick={() => deleteAllAction()}>
                <FontAwesomeIcon icon={faMinusCircle} />
                Unselect All
              </button>
            </li>
            <li>
              <button type="button" onClick={() => deleteAllAction()}>
                <FontAwesomeIcon icon={faTrash} />
                Delete All Selected
              </button>
            </li> */}
          </>
        )}
      </ul>
    </div>
  );
};

SelectedDataContextMenu.propTypes = {
  deleteAction: PropTypes.func,
  editAction: PropTypes.func,
  deselectAction: PropTypes.func,
};

export default SelectedDataContextMenu;
