import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import Dialog from 'components/Dialog';

import {
  RecordAddedHeader,
  RecordAddedCode,
  RecordAddedActions,
  RecordAddedTitle,
} from './RecordAdded.module.scss';

import Button from 'components/Button';

const RecordAdded = ({ currentRecord }) => {
  return (
    <Modal>
      <Dialog width="650px">
        <header className={RecordAddedHeader}>
          <h3 className={RecordAddedTitle}>New Record Added</h3>
          <p>
            Your record has been created and the patient’s data has been loaded.
            For future reference, this record can be found with the following
            Record ID:
          </p>
        </header>
        <p className={RecordAddedCode}>{currentRecord}</p>
        <div className={RecordAddedActions}>
          <Button large onClick={() => console.log('Close Modal')} text="Ok" />
        </div>
      </Dialog>
    </Modal>
  );
};

RecordAdded.propTypes = {
  currentRecord: PropTypes.string,
};

export default RecordAdded;
