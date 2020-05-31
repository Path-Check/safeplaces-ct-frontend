import React from 'react';

import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';

export default { title: 'Redactor Tools Date Selector' };

export const Default = () => (
  <SidebarWrapper>
    <DateSelector
      dates={[
        'Sat, May 9, 2020',
        'Sat, May 13, 2020',
        'Sat, May 17, 2020',
        'Sat, May 21, 2020',
        'Sat, May 24, 2020',
      ]}
    />
  </SidebarWrapper>
);

export const SingleDate = () => (
  <SidebarWrapper>
    <DateSelector dates={['Sat, May 9, 2020']} />
  </SidebarWrapper>
);
