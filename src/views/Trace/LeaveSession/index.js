import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import Dialog from 'components/Dialog';

import {
  LeaveSessionHeader,
  LeaveSessionCode,
  LeaveSessionActions,
  LeaveSessionTitle,
} from './LeaveSession.module.scss';

import Button from 'components/Button';

const LeaveSession = () => {
  return (
    <Modal>
      <Dialog width="650px">
        <header className={LeaveSessionHeader}>
          <h3 className={LeaveSessionTitle}>Leave Session</h3>
          <p>
            You have unsaved data from this session. Do you want to save the
            session for later?
          </p>
        </header>
        <div className={LeaveSessionActions}>
          <Button large onClick={() => console.log('Save Session')}>
            Yes, Save Session
          </Button>
          <Button large secondary to="/">
            No, Leave without Saving
          </Button>
          <Button large secondary onClick={() => console.log('Cancel')}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

LeaveSession.propTypes = {};

export default LeaveSession;
