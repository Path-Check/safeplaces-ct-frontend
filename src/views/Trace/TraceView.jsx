import React from 'react';

import { useSelector } from 'react-redux';

import applicationSelectors from 'ducks/application/selectors';

import RedactorTools from 'components/_shared/RedactorTools';
import SidebarHeader from 'components/_shared/Sidebar/SidebarHeader';
import TracerLoadActions from 'views/Trace/Actions/LoadActions';
import TracerToolActions from 'views/Trace/Actions/ToolActions';
import PointEditor from 'components/_shared/PointEditor';
import { Transition } from 'react-transition-group';

const TraceView = React.memo(() => {
  const { status: appStatus, renderEditor } = useSelector(
    state => state.application,
  );
  const { trace } = useSelector(state => state.content);
  const renderPointEditor =
    appStatus === 'EDIT POINT' || appStatus === 'ADD POINT';

  const title = trace?.title;
  const intro = trace?.introduction;

  return (
    <>
      {renderEditor ? (
        <>
          <Transition
            in={renderPointEditor}
            appear
            timeout={{
              enter: 200,
              exit: 200,
            }}
            unmountOnExit
          >
            {transition => (
              <PointEditor
                animationState={transition}
                isEdit={appStatus === 'EDIT POINT'}
              />
            )}
          </Transition>
          <RedactorTools />
          <TracerToolActions />
        </>
      ) : (
        <>
          <SidebarHeader title={title} intro={intro} />
          <TracerLoadActions />
        </>
      )}
    </>
  );
});

export default TraceView;
