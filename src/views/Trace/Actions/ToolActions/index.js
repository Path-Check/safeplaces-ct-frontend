import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';
import { useSelector, useDispatch } from 'react-redux';

import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';

const TracerToolActions = () => {
  const dispatch = useDispatch();
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state => pointsSelectors.getFilteredPoints(state));

  const allowStaging = points.length === filteredPoints.length;

  return (
    <div className={sidebarActions}>
      {allowStaging && <Button
        id="stage-for-publishing"
        disabled={points?.length < 1}
        onClick={() => dispatch(applicationActions.updateStatus('STAGE CASE'))}
      >
        Stage All Data for Publishing
      </Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
