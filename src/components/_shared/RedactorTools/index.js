import React from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';
import FilterData from 'components/_shared/RedactorTools/FilterData';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';
import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import SelectedDataList from 'components/_shared/SelectedData';

const RedactorTools = () => {
  return (
    <>
      <RedactorToolsHeader />
      <DateSelector />
      <FilterData>
        <DurationFilter />
        <TravellingFilter />
      </FilterData>
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
