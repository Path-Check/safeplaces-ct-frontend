import React from 'react';
import './accordion.css';

import { selectedDataList } from '../SelectedData.module.scss';

import moment from 'moment';
import SelectedDataGroup from 'components/_shared/SelectedData/SelectedDataList/SelectedDataGroup';

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
      {groupedPointsArray?.map((p, i) => {
        return (
          <SelectedDataGroup groupedPoints={groupedPoints} p={p} index={i} />
        );
      })}
    </div>
  ) : null;
});

export default SelectedDataList;
