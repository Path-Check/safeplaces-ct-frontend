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

  return (
    <div className={sidebarActions}>
      <Button
        disabled={points?.length < 1}
        onClick={() => dispatch(applicationActions.updateStatus('STAGE CASE'))}
      >
        Stage for Publishing
      </Button>
      <Button secondary>Save Session</Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
