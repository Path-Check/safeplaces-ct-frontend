import React from 'react';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  deletePointsWrapper,
  deletePointsBody,
} from './DeletePoints.module.scss';

import { useSelector, useDispatch } from 'react-redux';
import pointsSelectors from 'ducks/points/selectors';
import applicationActions from 'ducks/application/actions';
import pointsActions from 'ducks/points/actions';

import Button from 'components/_shared/Button';

const DeletePoints = () => {
  const dispatch = useDispatch();
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const points = useSelector(state => pointsSelectors.getPoints(state));

  return (
    <Modal>
      <Dialog width="650px">
        <header className={deletePointsWrapper}>
          <h3>Delete Multiple Points</h3>
          <p>
            Are you sure you want to delete {filteredPoints.length} from{' '}
            {points.length}?
          </p>
        </header>
        <div className={deletePointsBody}>
          <Button large onClick={() => dispatch(pointsActions.deletePoints())}>
            Yes, Delete {filteredPoints.length} Points
          </Button>
          <Button
            large
            secondary
            onClick={() => dispatch(applicationActions.updateStatus(''))}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default DeletePoints;
