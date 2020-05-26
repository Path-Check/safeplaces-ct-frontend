import React from 'react';

import { tracer } from './Tracer.module.scss';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import TracerToolActions from 'views/Trace/Actions/ToolActions';

const Trace = ({ record }) => {
  return (
    <div class={tracer}>
      <SidebarWrapper>
        {record ? (
          <>
            <RedactorTools /> <TracerToolActions />
          </>
        ) : (
          <>
            <SidebarHeader
              title="Contact Trace"
              copy="Review and edit patient location data during a contact trace interview."
            />{' '}
            <TracerLoadActions />
          </>
        )}
      </SidebarWrapper>
      <Map />
    </div>
  );
};

export default Trace;
