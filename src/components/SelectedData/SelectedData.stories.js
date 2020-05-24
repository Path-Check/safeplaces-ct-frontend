import React from 'react';

import SelectedData from './';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';

export default {
  title: 'Selected Data',
};

const items = [
  {
    id: '1',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 9, 2020',
    time: '14:23',
    duration: '5 min',
    travelling: true,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 12, 2020',
    time: '12:13',
    duration: '5 min',
    travelling: false,
  },
];

export const Default = () => (
  <SidebarWrapper>
    <SelectedData items={items} visible={24} total={500} />
  </SidebarWrapper>
);
