import React, { useState, useRef, useEffect } from 'react';

import { FixedSizeList as List } from 'react-window';

import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataList/SelectedDataItem';
import pointsSelectors from 'ducks/points/selectors';
import { useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';

import {
  accordionItem,
  accordionButton,
  accordionPanel,
} from './selectedDataGroup.module.scss';

const rowRenderer = ({ data, index, style }) => {
  const { points, activePoint, appMode } = data;
  const p = points[index];

  return (
    <SelectedDataItem
      style={style}
      key={p.id}
      {...p}
      isTrace={appMode === 'trace'}
      isHighlighted={activePoint?.id === p.id}
    />
  );
};

const getListHeight = array => {
  const size = array.length * 50;

  return size > 300 ? 300 : size;
};

const SelectedDataGroup = React.memo(({ groupedPoints, index, p }) => {
  const groupRef = useRef();
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );

  const appMode = useSelector(state => applicationSelectors.getMode(state));

  useEffect(() => {
    const _GroupEl = groupRef.current;

    if (!isExpanded || !_GroupEl) return;

    _GroupEl.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }, [isExpanded]);

  return (
    <div className={accordionItem} ref={groupRef}>
      <button
        aria-expanded={!isExpanded}
        onClick={() => setIsExpanded(!isExpanded)}
        className={accordionButton}
      >
        {Object.keys(groupedPoints)[index]}
      </button>

      {isExpanded && (
        <div className={accordionPanel} aria-hidden={!isExpanded}>
          <List
            itemCount={p.length}
            height={getListHeight(p)}
            width="100%"
            itemSize={50}
            itemData={{
              points: p,
              appMode: appMode,
              activePoint: activePoint,
            }}
          >
            {rowRenderer}
          </List>
        </div>
      )}
    </div>
  );
});

export default SelectedDataGroup;
