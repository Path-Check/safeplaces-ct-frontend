import React from 'react';
import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  deletePointsWrapper,
  deletePointsBody,
} from './DeletePoints.module.scss';

import Button from 'components/_shared/Button';

const DeletePoints = ({ closeAction, deleteAction, points }) => {
  const count = points.length;

  return (
    <Modal closeAction={closeAction}>
      <Dialog>
        <header className={deletePointsWrapper}>
          <h3>Delete Multiple Points</h3>
          <p>
            Are you sure you want to delete {count} point(s)? <br />
            (This action cannot be undone)
          </p>
        </header>
        <div className={deletePointsBody}>
          <Button id="yes-delete-points" onClick={deleteAction}>
            Yes, Delete {count} Point(s)
          </Button>
          <Button id="cancel-button" secondary onClick={closeAction}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default DeletePoints;
