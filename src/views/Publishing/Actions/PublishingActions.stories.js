import React from 'react';

import SidebarWrapper from 'components/Sidebar/SidebarWrapper';
import PublishingActions from 'views/Publishing/Actions';

export default {
  title: 'Publishing',
};

export const Actions = () => (
  <SidebarWrapper>
    <PublishingActions />
  </SidebarWrapper>
);
