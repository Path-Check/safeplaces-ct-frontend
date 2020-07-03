import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import './accordion.css';

import { selectedDataList } from '../../SelectedData.module.scss';

import { useSelector } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import SelectedDataItem from 'components/_shared/SelectedData/_parts/SelectedDataList/SelectedDataItem';
import moment from 'moment';

const SelectedDataList = () => {
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const groupByDate = items =>
    items.reduce((result, item) => {
      const date = moment(item.time).format('ddd, MMMM D, YYYY');
      return {
        ...result,
        [date]: [...(result[date] || []), item],
      };
    }, {});

  const groupedPoints = groupByDate(filteredPoints);

  return filteredPoints?.length > 0 ? (
    <Accordion allowZeroExpanded allowMultipleExpanded>
      {Object.values(groupedPoints)?.map((p, i) => {
        console.log(Object.keys(groupedPoints)[i]);
        return (
          <AccordionItem>
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
  ) : null;
};

export default SelectedDataList;
