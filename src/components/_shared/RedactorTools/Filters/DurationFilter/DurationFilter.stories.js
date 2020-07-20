import React from 'react';

import DurationFilter from './';

import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';

export default {
  title: 'Filter Data/Duration Filter',
};

export const Default = () => (
  <SidebarWrapper>
    <DurationFilter />
  </SidebarWrapper>
);
