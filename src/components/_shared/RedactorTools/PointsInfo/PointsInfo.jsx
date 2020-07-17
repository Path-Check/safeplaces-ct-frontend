import React from 'react';

import {
  pointsInfoHeader,
  pointsInfoSelection,
  pointsInfoAddPoint,
} from './PointsInfo.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import { getFilteredPoints, getPoints } from 'ducks/points/selectors';
import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const PointsInfo = () => {
  const activeCases = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );
  const dispatch = useDispatch();
  const points = useSelector(getPoints);

  const filteredPoints = useSelector(getFilteredPoints);
  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  return (
    <div className={pointsInfoHeader}>
      {activeCases && points.length > 0 && (
        <p className={pointsInfoSelection}>
          Showing {filteredPoints?.length} of {points?.length} Points
        </p>
      )}
      {!isPublish && (
        <button
          className={pointsInfoAddPoint}
          id="add-data-point"
          type="button"
          onClick={() => {
            dispatch(applicationActions.updateStatus('ADD POINT'));
          }}
        >
          <FontAwesomeIcon icon={faPlus} /> Add Point(s)
        </button>
      )}
    </div>
  );
};

export default PointsInfo;
