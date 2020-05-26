import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  AddNewRecordHeader,
  AddNewRecordCode,
  AddNewRecordActions,
  AddNewRecordTitle,
} from './AddNewRecord.module.scss';

import Button from 'components/_shared/Button';
import recordsSelectors from 'ducks/record/selectors';
import recordActions from 'ducks/record/actions';

const AddNewRecord = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => recordsSelectors.getStatus(state));
  const record = useSelector(state => recordsSelectors.getRecord(state));
  const accessCode = useSelector(state =>
    recordsSelectors.getAccessCode(state),
  );

  if (status !== 'RECORD ADDED') {
    return null;
  }

  return (
    <Modal>
      <Dialog width="650px">
        <header className={AddNewRecordHeader}>
          <h3 className={AddNewRecordTitle}>Add New Record</h3>
        </header>
        {accessCode && (
          <>
            <p>
              Share the access code below with a patient in order to load their
              location data for contact tracing.
            </p>
            <p className={AddNewRecordCode}>{accessCode}</p>
            <div>or</div>
          </>
        )}
        <div className={AddNewRecordActions}>
          {record?.id && (
            <Button large onClick={() => dispatch(recordActions.clearStatus())}>
              Create Record Manually
            </Button>
          )}
          <Button
            secondary
            large
            onClick={() => dispatch(recordActions.delete())}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default AddNewRecord;
