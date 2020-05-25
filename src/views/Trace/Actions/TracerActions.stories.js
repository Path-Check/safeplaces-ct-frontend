import React from 'react';

import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
import TracerActions from 'views/Tracer/Actions';

export default {
  title: 'Tracer',
};

export const Actions = () => (
  <SidebarWrapper>
    <TracerActions />
  </SidebarWrapper>
);
