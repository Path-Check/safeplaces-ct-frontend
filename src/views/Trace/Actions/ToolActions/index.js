import React from 'react';
import classNames from 'classnames';

import {
  sidebarActions,
  sidebarActionsPadded,
} from 'views/ViewWrapper.module.scss';
import Button from 'components/_shared/Button';
import { useSelector, useDispatch } from 'react-redux';

import { getAllowStaging } from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';
import { applicationStates } from 'types/applicationStates';
import Tooltip from '../../../../components/_shared/Tooltip';
import applicationSelectors from '../../../../ducks/application/selectors';

const TracerToolActions = () => {
  const dispatch = useDispatch();
  const allowStaging = useSelector(getAllowStaging);
  const appStatus = useSelector(applicationSelectors.getStatus);
  const classes = classNames({
    [`${sidebarActions}`]: true,
    [`${sidebarActionsPadded}`]: true,
  });
  const stageForPublishing = () => {
    dispatch(applicationActions.updateStatus(applicationStates.STAGE_CASE));
  };
  return (
    <div className={classes}>
      {allowStaging && appStatus !== applicationStates.ADD_POINT && (
        <Tooltip
          text="Once you review the record, stage the data for publishing. This record can’t be staged because data is not real."
          tooltip={4}
          top="82%"
        />
      )}
      <Button
        id="stage-for-publishing"
        disabled={!allowStaging}
        onClick={stageForPublishing}
      >
        Stage All Data for Publishing
      </Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
