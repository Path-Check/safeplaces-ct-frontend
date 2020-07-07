import React from 'react';

import { selectedDataWrapper, clearFilters } from './SelectedData.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import pointsActions from '../../../ducks/points/actions';
import SelectedDataList from 'components/_shared/SelectedData/SelectedDataList/SelectedDataList';

const SelectedData = () => {
  const dispatch = useDispatch();
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const hiddenPoints = points.filter(({ hidden }) => hidden);

  return (
    <div className={selectedDataWrapper}>
      {(points.length !== filteredPoints.length || hiddenPoints.length > 0) && (
        <button
          onClick={() => dispatch(pointsActions.clearFilters())}
          className={clearFilters}
        >
          Clear all filters
        </button>
      )}
      <SelectedDataList />
    </div>
  );
};

export default SelectedData;
