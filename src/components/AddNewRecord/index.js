import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';
import Modal from 'components/Modal';
import Dialog from 'components/Dialog';

import {
  AddNewRecordHeader,
  AddNewRecordCode,
  AddNewRecordActions,
  AddNewRecordTitle,
} from './AddNewRecord.module.scss';

import Button from 'components/Button';

const AddNewRecord = ({ currentRecord, accessCode }) => {
  return (
    <Modal>
      <Dialog width="650px">
        <header className={AddNewRecordHeader}>
          <h3 className={AddNewRecordTitle}>Add New Record</h3>
          <p>
            Share the access code below with a patient in order to load their
            location data for contact tracing.
          </p>
        </header>
        <p className={AddNewRecordCode}>{accessCode}</p>
        <div>or</div>
        <div className={AddNewRecordActions}>
          {currentRecord && (
            <Button large to={currentRecord} text="Create Record Manually" />
          )}
          <Button
            secondary
            large
            onClick={() => console.log('Delete Case')}
            text="Cancel"
          />
        </div>
      </Dialog>
    </Modal>
  );
};

AddNewRecord.propTypes = {
  accessCode: PropTypes.string,
  currentRecord: PropTypes.string,
};

export default AddNewRecord;
