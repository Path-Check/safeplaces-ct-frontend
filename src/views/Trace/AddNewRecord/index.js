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
import casesSelectors from 'ducks/cases/selectors';
import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';

const AddNewRecord = () => {
  const dispatch = useDispatch();
  const status = useSelector(state => applicationSelectors.getStatus(state));
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));

  if (status !== 'CASE FETCHED') {
    return null;
  }

  return (
    <Modal>
      <Dialog width="650px">
        <header className={AddNewRecordHeader}>
          <h3 className={AddNewRecordTitle}>Add New Record</h3>
        </header>
        {activeCase?.authCode && (
          <>
            <p>
              Share the access code below with a patient in order to load their
              location data for contact tracing.
            </p>
            <p className={AddNewRecordCode}>{activeCase?.authCode}</p>
            <div>or</div>
          </>
        )}
        <div className={AddNewRecordActions}>
          {activeCase?.caseId && (
            <Button
              large
              onClick={() =>
                dispatch(applicationActions.updateStatus('CASE ACTIVE'))
              }
            >
              Create Record Manually
            </Button>
          )}
          <Button
            secondary
            large
            onClick={() => dispatch(casesActions.deleteCase())}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  );
};

export default AddNewRecord;
