import React from 'react';

import { useSelector } from 'react-redux';

import { tracer } from './Tracer.module.scss';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import TracerToolActions from 'views/Trace/Actions/ToolActions';
import AddNewRecord from 'views/Trace/AddNewRecord';

import recordsSelectors from 'ducks/record/selectors';

const Trace = () => {
  const record = useSelector(state => recordsSelectors.getRecord(state));

  return (
    <>
      <div class={tracer}>
        <SidebarWrapper>
          {record?.id ? (
            <>
              <RedactorTools /> <TracerToolActions />
            </>
          ) : (
            <>
              <SidebarHeader
                title="Contact Trace"
                copy="Review and edit patient location data during a contact trace interview."
              />
              <TracerLoadActions />
            </>
          )}
        </SidebarWrapper>
        <Map />
      </div>
      <AddNewRecord />
    </>
  );
};

export default Trace;
