import React from 'react';

import { publish } from './Publish.module.scss';

import Map from 'components/_shared/Map';
import RedactorTools from 'components/_shared/RedactorTools';
import SidebarWrapper from 'components/_shared/Sidebar/SidebarWrapper';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import PublishToolActions from 'views/Publish/Actions/ToolActions';
import PublishLoadActions from 'views/Publish/Actions/LoadActions';
import RecordsTable from 'components/_shared/RecordsTable';

const Publish = ({ record }) => {
  return (
    <>
      <div className={publish}>
        <SidebarWrapper>
          {record ? (
            <>
              <RedactorTools /> <PublishToolActions />
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
      <RecordsTable isPublishing />
    </>
  );
};

export default Publish;
