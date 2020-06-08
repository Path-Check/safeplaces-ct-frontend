import React, { useState } from 'react';

import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataItem';

import {
  selectedDataWrapper,
  selectedDataHeader,
  selectedDataHeaderInfo,
  selectedDataList,
  selectedDataAction,
  selectedDataSelection,
} from './SelectedData.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import SelectedDataContextMenu from 'components/_shared/SelectedData/SelectedDataContextMenu';
import { useSelector } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsSelectors from 'ducks/points/selectors';
import applicationSelectors from 'ducks/application/selectors';

const SelectedDataList = () => {
  const [showContentMenu, setShowContentMenu] = useState(false);
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';
  const renderedPoints = filteredPoints.length ? filteredPoints : points;

  const noFilteredPoints =
    useSelector(state => pointsSelectors.getFilteredPoints(state)).length < 1;

  return (
    <div className={selectedDataWrapper}>
      <div className={selectedDataHeader}>
        <h5>Selected Data</h5>
        <div className={selectedDataHeaderInfo}>
          {activeCase && points.length > 0 && (
            <p className={selectedDataSelection}>
              {renderedPoints?.length} of {points?.length}
            </p>
          )}
          {isPublish && noFilteredPoints ? null : (
            <button
              className={selectedDataAction}
              onClick={() => setShowContentMenu(!showContentMenu)}
              type="button"
            >
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          )}
        </div>

        {showContentMenu && (
          <SelectedDataContextMenu
            pointsLength={points.length}
            closeAction={() => setShowContentMenu(false)}
          />
        )}
      </div>
      {renderedPoints?.length > 0 && (
        <ul className={selectedDataList}>
          {renderedPoints?.map(p => (
            <SelectedDataItem key={p.latitude} {...p} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default SelectedDataList;
