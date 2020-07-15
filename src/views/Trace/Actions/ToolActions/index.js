import React from 'react';
import classNames from 'classnames';

import {
  sidebarActions,
  sidebarActionsPadded,
} from 'views/ViewWrapper.module.scss';
import Button from 'components/_shared/Button';
import { useSelector, useDispatch } from 'react-redux';

import pointsSelectors, {
  getPoints,
  getFilteredPoints,
  getAllowStaging,
} from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

const TracerToolActions = ({ isPadded }) => {
  const dispatch = useDispatch();

  const allowStaging = useSelector(getAllowStaging);

  const classes = classNames({
    [`${sidebarActions}`]: true,
    [`${sidebarActionsPadded}`]: true,
  });

  return (
    <div className={classes}>
      {allowStaging && (
        <Button
          id="stage-for-publishing"
          onClick={() =>
            dispatch(applicationActions.updateStatus('STAGE CASE'))
          }
        >
          Stage All Data for Publishing
        </Button>
      )}
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
