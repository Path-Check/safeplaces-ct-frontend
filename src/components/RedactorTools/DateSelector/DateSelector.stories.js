import React from 'react';
import DateSelector from 'components/RedactorTools/DateSelector';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
export default { title: 'Redactor Tools Date Selector' };

export const Default = () => (
  <SidebarWrapper>
    <DateSelector steps={15} minDate={1} maxDate={15} />
  </SidebarWrapper>
);
