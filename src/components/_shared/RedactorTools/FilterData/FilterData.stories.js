import React from 'react';

import FilterData from './';

import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';

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
