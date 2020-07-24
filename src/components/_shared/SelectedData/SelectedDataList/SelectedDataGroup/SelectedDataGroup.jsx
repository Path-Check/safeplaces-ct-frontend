import React, { useState, useRef, useEffect } from 'react';

import { FixedSizeList as List } from 'react-window';

import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataList/SelectedDataItem';
import { useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';

import {
  accordionItem,
  accordionButton,
  accordionPanel,
} from './selectedDataGroup.module.scss';
import getListHeight from '../../../../../helpers/getListHeight';

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

const SelectedDataGroup = React.memo(({ groupedPoints, index, p }) => {
  const groupRef = useRef();
  const [isExpanded, setIsExpanded] = useState(index === 0);

  const activePoint = useSelector(applicationSelectors.getActivePoint);

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
            height={getListHeight(p, 50, 300)}
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
