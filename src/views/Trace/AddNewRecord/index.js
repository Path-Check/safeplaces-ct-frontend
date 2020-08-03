import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  AddNewRecordHeader,
  AddNewRecordCode,
  AddNewRecordActions,
  AddNewRecordTitle,
  divider,
} from './AddNewRecord.module.scss';

import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';

import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';

const AddNewRecord = () => {
  const dispatch = useDispatch();

  const activeCases = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );
  const accessCode = useSelector(state => casesSelectors.getAccessCode(state));

  const handleClick = () => {
    dispatch(applicationActions.renderEditor(true));
    dispatch(applicationActions.newCase(true));
    dispatch(applicationActions.updateStatus(''));
  };

  return (
    <Modal closeAction={() => dispatch(casesActions.deleteCase())}>
      <Dialog width="650px">
        <div>
          <header className={AddNewRecordHeader}>
            <h3 className={AddNewRecordTitle}>Add New Record</h3>
          </header>
          {accessCode && (
            <>
              <p>
                <strong>
                  To add a new record, communicate the code below to a patient.
                </strong>{' '}
                They will need to enter this code in their Safe Paths app to
                upload their location data. Once they enter the code you can
                confirm you have received the data.
              </p>
              <p className={AddNewRecordCode}>{accessCode}</p>
              <div className={AddNewRecordActions}>
                <Button
                  id="check-data-upload"
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
            {activeCases && (
              <Button
                id="create-record-manually"
                secondary
                large
                onClick={handleClick}
              >
                Create Record Manually
              </Button>
            )}
          </div>
        </div>
      </Dialog>
    </Modal>
  );
};

export default AddNewRecord;
