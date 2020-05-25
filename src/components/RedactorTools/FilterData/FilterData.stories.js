import React from 'react';

import FilterData from './';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';

export default {
  title: 'Filter Data',
};

export const Default = () => (
  <SidebarWrapper>
    <FilterData />
  </SidebarWrapper>
);
