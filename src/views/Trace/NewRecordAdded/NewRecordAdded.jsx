import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Modal from 'components/_global/Modal';
import Dialog from 'components/_shared/Dialog';

import {
  NewRecordAddedHeader,
  NewRecordAddedActions,
  NewRecordAddedControl,
  NewRecordAddedTitle,
} from './NewRecordAdded.module.scss';

import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';

import applicationActions from 'ducks/application/actions';
import casesActions from 'ducks/cases/actions';
import TextInput from '@wfp/ui/lib/components/TextInput';
import casesService from 'ducks/cases/service';
import { faTimes, faCheck } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { applicationStates } from 'types/applicationStates';

const NewRecordAdded = () => {
  const dispatch = useDispatch();
  const { externalId, caseId } = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );

  const [isValid, setIsValid] = useState(true);
  const [value, setValue] = useState('');

  const onSubmit = () => {
    if (value && value !== externalId) {
      dispatch(casesActions.updExternalCaseIdRequest(value));
    } else {
      dispatch(applicationActions.updateStatus(applicationStates.IDLE));
    }
  };

  const handleOnChange = value => {
    setIsValid(false);
    setValue(value);

    const data = {
      caseId,
      externalId: value,
    };

    casesService
      .updateExternalCaseId(data)
      .then(response => setIsValid(true))
      .catch(() => setIsValid(false));
  };

  return (
    <Modal>
      <Dialog width={464}>
        <form onSubmit={onSubmit}>
          <header className={NewRecordAddedHeader}>
            <h3 className={NewRecordAddedTitle}>New record added</h3>
            <p>
              Your record has been created and the patient’s data has been
              loaded. Enter a record ID in the input below, or use the
              auto-generated ID.
            </p>
          </header>
          <div className={NewRecordAddedControl}>
            <TextInput
              onChange={e => handleOnChange(e.target.value)}
              placeholder={externalId}
              value={value}
              labelText=""
              id="recordId"
            />
            {value && !isValid ? (
              <FontAwesomeIcon icon={faTimes} style={{ color: 'red' }} />
            ) : (
              value && (
                <FontAwesomeIcon icon={faCheck} style={{ color: 'green' }} />
              )
            )}
          </div>
          {value && !isValid ? (
            <p>Please try an alternative external ID.</p>
          ) : (
            value && <p>External ID available.</p>
          )}
          <div className={NewRecordAddedActions}>
            <Button
              id="cancel-go-to-record"
              onClick={() =>
                dispatch(
                  applicationActions.updateStatus(applicationStates.IDLE),
                )
              }
              secondary
            >
              Cancel
            </Button>
            <Button
              id="go-to-record"
              type="submit"
              disabled={value && !isValid}
            >
              Go to record
            </Button>
          </div>
        </form>
      </Dialog>
    </Modal>
  );
};

export default NewRecordAdded;
