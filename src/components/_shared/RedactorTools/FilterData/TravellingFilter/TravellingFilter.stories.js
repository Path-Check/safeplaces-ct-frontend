import React from 'react';

import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';

export default {
  title: 'Filter Data/Travelling Filter',
};

export const Default = () => (
  <SidebarWrapper>
    <TravellingFilter />
  </SidebarWrapper>
);
