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

const SelectedDataContextMenu = ({
  closeAction,
  addAction,
  deleteAllAction,
  deselectAllAction,
}) => {
  const containerRef = useRef();

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
          <button type="button" onClick={() => addAction()}>
            <FontAwesomeIcon icon={faPlus} />
            Add Data point
          </button>
        </li>
        <li>
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
        </li>
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
