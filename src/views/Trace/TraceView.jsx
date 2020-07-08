import React from 'react';

import { useSelector } from 'react-redux';

import applicationSelectors from 'ducks/application/selectors';

import RedactorTools from 'components/_shared/RedactorTools';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import TracerToolActions from 'views/Trace/Actions/ToolActions';
import PointEditor from 'components/_shared/PointEditor';

const TraceView = () => {
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const renderEditor = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const title = 'Contact Trace';
  const intro =
    'Review and edit patient location data during a contact trace interview.';
  const renderPointEditor =
    appStatus === 'EDIT POINT' || appStatus === 'ADD POINT';

  return (
    <>
      {renderEditor ? (
        <>
          {renderPointEditor ? (
            <PointEditor isEdit={appStatus === 'EDIT POINT'} />
          ) : (
            <>
              <RedactorTools />
              <TracerToolActions />
            </>
          )}
        </>
      ) : (
        <>
          <SidebarHeader title={title} intro={intro} />
          <TracerLoadActions />
        </>
      )}
    </>
  );
};

export default TraceView;
