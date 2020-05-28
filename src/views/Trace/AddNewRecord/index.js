import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  AddNewRecordHeader,
  AddNewRecordCode,
  AddNewRecordActions,
  AddNewRecordTitle,
  closeIcon,
  divider,
} from './AddNewRecord.module.scss';

import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';
import applicationSelectors from 'ducks/application/selectors';
import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

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
              To add a new record, communicate the code below to a patient. They
              will need to enter this code in their Safe Paths app to upload
              their location data. Once they enter the code you can confirm you
              have received the data.
            </p>
            <p className={AddNewRecordCode}>{activeCase?.authCode}</p>
            <div className={AddNewRecordActions}>
              <Button
                large
                onClick={() => dispatch(casesActions.checkCaseGPSData())}
              >
                Check Data Upload
              </Button>
            </div>
            <div className={divider}>or</div>
          </>
        )}
        <div className={AddNewRecordActions}>
          {activeCase?.caseId && (
            <Button
              secondary
              large
              onClick={() =>
                dispatch(applicationActions.updateStatus('CASE ACTIVE'))
              }
            >
              Create Record Manually
            </Button>
          )}
          <FontAwesomeIcon
            icon={faTimes}
            className={closeIcon}
            onClick={() => dispatch(casesActions.deleteCase())}
          />
        </div>
      </Dialog>
    </Modal>
  );
};

export default AddNewRecord;
