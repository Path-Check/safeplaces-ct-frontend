import React from 'react';

import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import Select from 'components/_shared/Select/Select';

export default {
  title: 'Controls/Select',
};

const items = [
  {
    label: 'Contact Tracer',
  },
  {
    value: '1',
    label: 'Sat, May 9, 2020',
  },
  {
    value: '2',
    label: 'Sat, May 9, 2020',
  },
  {
    value: '3',
    label: 'Sat, May 9, 2020',
  },
];

export const Default = () => (
  <SidebarWrapper>
    <Select options={items} />
  </SidebarWrapper>
);
