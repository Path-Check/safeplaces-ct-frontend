import React from 'react';

import SidebarHeader from 'components/Sidebar/SidebarHeader';
import SidebarActions from 'components/Sidebar/SidebarActions';
import SidebarWrapper from 'components/Sidebar/SidebarWrapper';

export default {
  title: 'Sidebar (Updated)',
};

const copyBase = 'Review and edit patient location data';
const copyAdmin = `${copyBase} before publishing to your health authority subscribers.`;
const copyTracer = `${copyBase} during a contact trace interview.`;

export const Default = () => (
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
