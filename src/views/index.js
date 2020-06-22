import React, { useEffect } from 'react';

import { useSelector, useDispatch } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';

import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import AddNewRecord from 'views/Trace/AddNewRecord';
import RecordAdded from 'views/Trace/RecordAdded';
import DeletePoints from 'views/Trace/DeletePoints';
import RecordsTable from 'components/_shared/RecordsTable';
import StageForPublishing from 'views/Trace/StageForPublishing';
import TracerToolActions from 'views/Trace/Actions/ToolActions';
import ErrorBoundary from 'components/_global/errorBoundary';
import PublishData from 'views/Publish/PublishData';

import { viewWrapper } from './ViewWrapper.module.scss';
import PublishToolActions from 'views/Publish/Actions/ToolActions';
import PublishLoadActions from 'views/Publish/Actions/LoadActions';

const ViewWrapper = ({ viewType, title, intro }) => {
  const { pathname } = useLastLocation();
  const dispatch = useDispatch();
  const renderEditor = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const mode = useSelector(state => applicationSelectors.getMode(state));
  const isTrace = viewType === 'trace';

  useEffect(() => {
    if (!pathname.includes('settings')) {
      dispatch({
        type: 'RESET_VIEW',
      });
      dispatch(applicationActions.setMode(viewType));
    }
  }, [pathname, mode]);

  return (
    <>
      <div className={viewWrapper}>
        <SidebarWrapper>
          {renderEditor ? (
            <>
              <RedactorTools />
              {isTrace ? <TracerToolActions /> : <PublishToolActions />}
            </>
          ) : (
            <>
              <SidebarHeader title={title} intro={intro} />
              {isTrace ? <TracerLoadActions /> : <PublishLoadActions />}
            </>
          )}
        </SidebarWrapper>
        <ErrorBoundary>
          <Map />
        </ErrorBoundary>
      </div>
      <AddNewRecord />
      <RecordAdded />

      {appStatus === 'CASES ADDED' && <RecordsTable mode={mode} />}
      {appStatus === 'DELETE POINTS' && <DeletePoints />}
      {appStatus === 'STAGE CASE' && <StageForPublishing />}
      {appStatus === 'SUBMIT FOR PUBLISHING' && <PublishData />}
    </>
  );
};

export default ViewWrapper;
