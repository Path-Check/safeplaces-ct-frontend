import React, { useEffect } from 'react';

import { publish } from './Publish.module.scss';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import PublishToolActions from 'views/Publish/Actions/ToolActions';
import PublishLoadActions from 'views/Publish/Actions/LoadActions';
import RecordsTable from 'components/_shared/RecordsTable';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector, useDispatch } from 'react-redux';
import applicationActions from 'ducks/application/actions';

import PublishData from 'views/Publish/PublishData';

const Publish = ({ record }) => {
  const dispatch = useDispatch();
  const renderEditor = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const appStatus = useSelector(state => applicationSelectors.getStatus(state));
  const appMode = useSelector(state => applicationSelectors.getMode(state));
  useEffect(() => {
    dispatch({
      type: 'RESET_VIEW',
    });
  }, []);

  useEffect(() => {
    dispatch(applicationActions.setMode('publish'));
  }, [appMode]);

  return (
    <>
      <div className={publish}>
        <SidebarWrapper>
          {renderEditor ? (
            <>
              <RedactorTools />
              <PublishToolActions />
            </>
          ) : (
            <>
              <SidebarHeader
                title="Publish Data"
                copy="Review and edit patient location data before publishing to your health authority subscribers."
              />
              <PublishLoadActions />
            </>
          )}
        </SidebarWrapper>
        <Map />
      </div>
      {appStatus === 'SUBMIT FOR PUBLISHING' && <PublishData />}
      {appStatus === 'CASES ADDED' && <RecordsTable />}
    </>
  );
};

export default Publish;
