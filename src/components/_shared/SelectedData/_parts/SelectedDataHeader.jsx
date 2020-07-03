import React from 'react';

import {
  selectedDataHeader,
  selectedDataSelection,
  selectedDataAddPoint,
} from '../SelectedData.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsSelectors from 'ducks/points/selectors';
import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const SelectedDataHeader = () => {
  const activeCases = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );
  const dispatch = useDispatch();
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  return (
    <div className={selectedDataHeader}>
      {activeCases && points.length > 0 && (
        <p className={selectedDataSelection}>
          Showing {filteredPoints?.length} of {points?.length} Points
        </p>
      )}
      {!isPublish && (
        <button
          className={selectedDataAddPoint}
          id="add-data-point"
          type="button"
          onClick={() => {
            dispatch(applicationActions.updateStatus('ADD POINT'));
          }}
        >
          Add Point <FontAwesomeIcon icon={faPlus} />
        </button>
      )}
    </div>
  );
};

export default SelectedDataHeader;
