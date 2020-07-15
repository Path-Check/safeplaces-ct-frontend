import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { useLastLocation } from 'react-router-last-location';

import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';

import Map from 'components/_shared/Map';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import ErrorBoundary from 'components/_global/errorBoundary';

import { viewWrapper } from './ViewWrapper.module.scss';
import ModalSwitch from 'components/_global/Modal/ModalSwitch';
import TraceView from 'views/Trace';
import PublishView from 'views/Publish';

const ViewWrapper = React.memo(({ viewType, title, intro }) => {
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
          {isTrace ? <TraceView /> : <PublishView />}
        </SidebarWrapper>
        <ErrorBoundary>
          <Map />
        </ErrorBoundary>
      </div>
      <ModalSwitch mode={mode} status={appStatus} />
    </>
  );
});

export default ViewWrapper;
