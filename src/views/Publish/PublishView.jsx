import React from 'react';

import { useSelector } from 'react-redux';

import applicationSelectors from 'ducks/application/selectors';

import RedactorTools from 'components/_shared/RedactorTools';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import PublishLoadActions from 'views/Publish/Actions/LoadActions';
import PublishToolActions from 'views/Publish/Actions/ToolActions';

const PublishView = () => {
  const renderEditor = useSelector(state =>
    applicationSelectors.getRenderEditor(state),
  );
  const title = 'Publish Data';
  const intro =
    'Review and edit patient location data before publishing to your health authority subscribers.';

  return (
    <>
      {renderEditor ? (
        <>
          <RedactorTools />
          <PublishToolActions />
        </>
      ) : (
        <>
          <SidebarHeader title={title} intro={intro} />
          <PublishLoadActions />
        </>
      )}
    </>
  );
};

export default PublishView;
