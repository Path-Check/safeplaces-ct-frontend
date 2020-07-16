import React, { useState } from 'react';

import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataList/SelectedDataItem';
import pointsSelectors from 'ducks/points/selectors';
import { useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';

const SelectedDataGroup = React.memo(({ groupedPoints, index, p }) => {
  const activePoint = useSelector(state =>
    pointsSelectors.getActivePoint(state),
  );
  const [isExpanded, setIsExpanded] = useState(index === 0);
  const appMode = useSelector(state => applicationSelectors.getMode(state));

  return (
    <div>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {Object.keys(groupedPoints)[index]}
      </button>
      {isExpanded && (
        <div>
          {Object.values(p).map(e => (
            <SelectedDataItem
              key={e.id}
              {...e}
              isTrace={appMode === 'trace'}
              isHighlighted={activePoint?.id === e.id}
            />
          ))}
        </div>
      )}
    </div>
  );
});

export default SelectedDataGroup;
