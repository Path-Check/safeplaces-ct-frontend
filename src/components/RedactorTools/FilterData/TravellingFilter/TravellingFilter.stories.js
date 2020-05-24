import React from 'react';

import TravellingFilter from '.';

import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
import FilterData from 'components/RedactorTools/FilterData';

export default {
  title: 'Filter Data/Duration Filter',
};

export const Default = () => (
  <SidebarWrapper>
    <FilterData>
      <TravellingFilter />
    </FilterData>
  </SidebarWrapper>
);
