import React from 'react';
import classNames from 'classnames';

import {
  sidebarActions,
  sidebarActionsPadded,
} from 'views/ViewWrapper.module.scss';
import Button from 'components/_shared/Button';
import { useSelector, useDispatch } from 'react-redux';

import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

const TracerToolActions = ({ isPadded }) => {
  const dispatch = useDispatch();
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  const allowStaging = points.length === filteredPoints.length;

  const classes = classNames({
    [`${sidebarActions}`]: true,
    [`${sidebarActionsPadded}`]: true,
  });

  return (
    <div className={classes}>
      {allowStaging && (
        <Button
          id="stage-for-publishing"
          disabled={points?.length < 1}
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
