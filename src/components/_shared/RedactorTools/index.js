import React from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';
import FilterData from 'components/_shared/RedactorTools/FilterData';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';
import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import SelectedDataList from 'components/_shared/SelectedData';
import { useSelector } from 'react-redux';
import pointsSelectors from '../../../ducks/points/selectors';

const RedactorTools = () => {
  const dates = useSelector(state => pointsSelectors.getPointsDates(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));

  return (
    <>
      <RedactorToolsHeader />
      {points?.length > 1 && (
        <>
          <DateSelector dates={dates} />
          <FilterData>
            <DurationFilter />
          </FilterData>
        </>
      )}
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
