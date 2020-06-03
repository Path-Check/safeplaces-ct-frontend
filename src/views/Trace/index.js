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

import casesSelectors from 'ducks/cases/selectors';
import RecordAdded from 'views/Trace/RecordAdded';
import RecordsTable from 'components/_shared/RecordsTable';
import applicationSelectors from 'ducks/application/selectors';

const Trace = () => {
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));

  const renderTools = status === 'CASE ACTIVE' && activeCase?.caseId;

  return (
    <>
      <div className={tracer}>
        <SidebarWrapper>
          {renderTools ? (
            <>
              <RedactorTools />
              {/* <TracerToolActions /> */}
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
      <RecordsTable />
    </>
  );
};

export default Trace;
