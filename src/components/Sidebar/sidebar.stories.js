import React from 'react';

import SidebarHeader from 'components/Sidebar/SidebarHeader';
import SidebarActions from 'components/Sidebar/SidebarActions';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
import DateSelector from 'components/RedactorTools/DateSelector';
import FilterData from 'components/RedactorTools/FilterData';
import DurationFilter from 'components/RedactorTools/FilterData/DurationFilter';
import SelectedDataList from 'components/SelectedData';
import RedactorToolsHeader from 'components/RedactorTools/Header';
import TravellingFilter from 'components/RedactorTools/FilterData/TravellingFilter';

export default {
  title: 'Sidebars',
};

const copyBase = 'Review and edit patient location data';
const copyAdmin = `${copyBase} before publishing to your health authority subscribers.`;
const copyTracer = `${copyBase} during a contact trace interview.`;

export const Tracer = () => (
  <SidebarWrapper>
    <SidebarHeader copy={copyTracer} />
    <SidebarActions />
  </SidebarWrapper>
);

export const Admin = () => (
  <SidebarWrapper>
    <SidebarHeader copy={copyAdmin} isAdmin />
    <SidebarActions isAdmin />
  </SidebarWrapper>
);

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
    id: '1',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 9, 2020',
    time: '14:27',
    duration: '5 min',
    travelling: true,
  },
  {
    id: '1',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 9, 2020',
    time: '14:29',
    duration: '5 min',
    travelling: true,
  },
  {
    id: '3',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 13, 2020',
    time: '21:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 14, 2020',
    time: '09:13',
    duration: '5 min',
    travelling: false,
  },
  {
    id: '2',
    latLng: [53.581436, -2.536986],
    date: 'Sat, May 16, 2020',
    time: '11:13',
    duration: '5 min',
    travelling: false,
  },
];

export const Tools = () => (
  <SidebarWrapper>
    <RedactorToolsHeader currentRecord="532523423" />
    <DateSelector
      dates={[
        'Sat, May 9, 2020',
        'Sat, May 13, 2020',
        'Sat, May 17, 2020',
        'Sat, May 21, 2020',
        'Sat, May 24, 2020',
      ]}
    />
    <FilterData>
      <DurationFilter />
      <TravellingFilter />
    </FilterData>
    <SelectedDataList items={items} visible={24} total={500} />
  </SidebarWrapper>
);
