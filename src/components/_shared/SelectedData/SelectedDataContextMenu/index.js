import React, { useEffect, useRef } from 'react';

import PropTypes from 'prop-types';

import {
  selectedDataContextMenu,
  selectedDataContextMenuAction,
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
import { useDispatch, useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';
import pointsActions from 'ducks/points/actions';
import pointsSelectors from 'ducks/points/selectors';

const SelectedDataContextMenu = ({
  closeAction,
  addAction,
  deleteAllAction,
  pointsLength,
  deselectAllAction,
}) => {
  const containerRef = useRef();
  const dispatch = useDispatch();
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));

  const isTrace =
    useSelector(state => applicationSelectors.getMode(state)) === 'trace';
  const noFilteredPoints =
    useSelector(state => pointsSelectors.getFilteredPoints(state)).length < 1;

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
      <ul>
        {appStatus !== 'ADD POINT' && isTrace && (
          <li>
            <button
              className={selectedDataContextMenuAction}
              type="button"
              onClick={() => {
                dispatch(applicationActions.updateStatus('ADD POINT'));
                closeAction();
              }}
            >
              <FontAwesomeIcon icon={faPlus} />
              Add Data point
            </button>
          </li>
        )}

        {!noFilteredPoints && (
          <>
            <li>
              <button
                type="button"
                onClick={() => dispatch(pointsActions.setFilteredPoints([]))}
                className={selectedDataContextMenuAction}
              >
                <FontAwesomeIcon icon={faMinusCircle} />
                Unselect All
              </button>
            </li>
            {isTrace && (
              <li>
                <button
                  type="button"
                  onClick={() => deleteAllAction()}
                  className={selectedDataContextMenuAction}
                >
                  <FontAwesomeIcon icon={faTrash} />
                  Delete All Selected
                </button>
              </li>
            )}
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
