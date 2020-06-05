import React from 'react';

import { useSelector } from 'react-redux';

import { tracer } from './Tracer.module.scss';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import AddNewRecord from 'views/Trace/AddNewRecord';

import RecordAdded from 'views/Trace/RecordAdded';
import RecordsTable from 'components/_shared/RecordsTable';
import applicationSelectors from 'ducks/application/selectors';
import StageForPublishing from 'views/Trace/StageForPublishing';
import TracerToolActions from 'views/Trace/Actions/ToolActions';

const Trace = () => {
  const renderEditor = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );

  const appStatus = useSelector(state => applicationSelectors.getStatus(state));

  return (
    <>
      <div className={tracer}>
        <SidebarWrapper>
          {renderEditor ? (
            <>
              <RedactorTools />
              <TracerToolActions />
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
      <RecordAdded />

      {appStatus === 'CASES ADDED' && <RecordsTable />}

      {appStatus === 'STAGE CHANGES' && <StageForPublishing />}
    </>
  );
};

export default Trace;
