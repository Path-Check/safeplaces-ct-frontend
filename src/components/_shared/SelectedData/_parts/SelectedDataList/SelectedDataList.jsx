import React from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionItemHeading,
  AccordionItemButton,
  AccordionItemPanel,
} from 'react-accessible-accordion';
import 'react-accessible-accordion/dist/fancy-example.css';

import { selectedDataList } from '../../SelectedData.module.scss';

import { useSelector } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import SelectedDataItem from 'components/_shared/SelectedData/_parts/SelectedDataList/SelectedDataItem';
import moment from 'moment';

const SelectedDataList = () => {
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  return filteredPoints?.length > 0 ? (
    <Accordion allowZeroExpanded>
      {filteredPoints?.map(p => (
        <AccordionItem>
          <AccordionItemHeading>
            <AccordionItemButton>
              {moment(p.time).format('ddd, MMMM D, YYYY')}
            </AccordionItemButton>
          </AccordionItemHeading>
          <AccordionItemPanel>
            <SelectedDataItem key={p.pointId} {...p} />
          </AccordionItemPanel>
        </AccordionItem>
      ))}
    </Accordion>
  ) : null;
};

export default SelectedDataList;
