import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css';

import { selectedDataList } from '../SelectedData.module.scss';

import moment from 'moment';
import SelectedDataItem from 'components/_shared/SelectedData/SelectedDataList/SelectedDataItem';

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
  const preExpandArray = () => {
    const arr = new Array(groupedPointsArray.length);
    for (let i = 0; i <= groupedPointsArray.length; i++) {
      arr.push(i);
    }
    return arr;
  };

  return filteredPoints?.length > 0 ? (
    <div className={selectedDataList}>
      <Accordion
        allowZeroExpanded
        allowMultipleExpanded
        preExpanded={preExpandArray()}
      >
        {groupedPointsArray?.map((p, i) => {
          return (
            <AccordionItem uuid={i} key={`list-points-${i}`}>
              <AccordionItemHeading>
                <AccordionItemButton>
                  {Object.keys(groupedPoints)[i]}
                </AccordionItemButton>
              </AccordionItemHeading>
              <AccordionItemPanel>
                {Object.values(p).map(e => (
                  <SelectedDataItem key={e.pointId} {...e} />
                ))}
              </AccordionItemPanel>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  ) : null;
});

export default SelectedDataList;
