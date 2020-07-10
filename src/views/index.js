import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';

import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import TracerToolActions from 'views/Trace/Actions/ToolActions';
import ErrorBoundary from 'components/_global/errorBoundary';

import { viewWrapper } from './ViewWrapper.module.scss';
import PublishToolActions from 'views/Publish/Actions/ToolActions';
import PublishLoadActions from 'views/Publish/Actions/LoadActions';
import ModalSwitch from 'components/_global/Modal/ModalSwitch';

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
        <SidebarWrapper isPadded={!renderEditor}>
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
      <ModalSwitch mode={mode} status={appStatus} />
    </>
  );
};

export default ViewWrapper;
