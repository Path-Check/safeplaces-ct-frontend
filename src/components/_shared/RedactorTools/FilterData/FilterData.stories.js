import React from 'react';

import FilterData from './';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
import TravellingFilter from 'components/RedactorTools/FilterData/TravellingFilter';
import DurationFilter from 'components/RedactorTools/FilterData/DurationFilter';

export default {
  title: 'Filter Data',
};

export const Default = () => (
  <SidebarWrapper>
    <FilterData>
      <DurationFilter />
      <TravellingFilter />
    </FilterData>
  </SidebarWrapper>
);
