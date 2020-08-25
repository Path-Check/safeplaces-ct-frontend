import React from 'react';

import { selectedDataList } from '../SelectedData.module.scss';

import moment from 'moment';
import SelectedDataGroup from 'components/_shared/SelectedData/SelectedDataList/SelectedDataGroup';
import Tooltip from '../../Tooltip';

const SelectedDataList = React.memo(({ filteredPoints }) => {
  const groupByDate = items =>
    items.reduce((result, item) => {
      const date = moment(item.time).format('ddd, MMMM D, YYYY');
      return {
        ...result,
        [date]: [...(result[date] || []), item],
      };
    }, {});

  const groupedPoints = groupByDate(filteredPoints);
  const groupedPointsArray = Object.values(groupedPoints);

  return filteredPoints?.length > 0 ? (
    <div className={selectedDataList}>
      <Tooltip
        text="Click a data point and you will be able to edit, label or delete it."
        tooltip={3}
        top={'22%'}
      />
      {groupedPointsArray?.map((p, i) => {
        return (
          <SelectedDataGroup
            groupedPoints={groupedPoints}
            p={p}
            key={`${p.id}${i}`}
            index={i}
          />
        );
      })}
    </div>
  ) : null;
});

export default SelectedDataList;
