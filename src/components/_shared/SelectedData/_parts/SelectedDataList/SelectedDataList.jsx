import React from 'react';

import { selectedDataList } from '../../SelectedData.module.scss';

import { useSelector } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import SelectedDataItem from 'components/_shared/SelectedData/_parts/SelectedDataList/SelectedDataItem';

const SelectedDataList = () => {
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  return filteredPoints?.length > 0 ? (
    <ul className={selectedDataList}>
      {filteredPoints?.map(p => (
        <SelectedDataItem key={p.pointId} {...p} />
      ))}
    </ul>
  ) : null;
};

export default SelectedDataList;
