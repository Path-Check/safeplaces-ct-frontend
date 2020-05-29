import React from 'react';

import SelectedDataItem from './';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';

export default {
  title: 'Selected Data / Item',
};

const data = {
  id: '1',
  latLng: [53.581436, -2.536986],
  date: 'Sat, May 9, 2020',
  time: '14:23',
  duration: '5 min',
  travelling: true,
};

export const Default = () => (
  <SidebarWrapper>
    <SelectedDataItem {...data} />
  </SidebarWrapper>
);

export const Highlighted = () => (
  <SidebarWrapper>
    <SelectedDataItem {...data} hightlightedItem="1" />
  </SidebarWrapper>
);
