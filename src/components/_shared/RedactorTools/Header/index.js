import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux'
import { redactorToolsHeader, selectedfaEllipsisVIcon, ModalButton } from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import { Button, TextInput } from '@wfp/ui'
import Modal from '../../../_global/Modal';
import Dialog from '../../../_shared/Dialog';
import casesSelectors from 'ducks/cases/selectors';
import caseAction from 'ducks/cases/actions';
import { useSelector } from 'react-redux';

const RedactorToolsHeader = ({ currentRecord }) => {
  const dispatch = useDispatch();
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const [showModal, setShowModal] = useState(false);
  const [externalInpuValue, setInputValue] = useState("");

  const handleBack = () => console.log('go back');
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmit = () => {
    if (activeCase) {
      dispatch(caseAction.updExternalCaseId(externalInpuValue));
      console.log('upd:', caseAction.updExternalCaseId(externalInpuValue))
    }
  };

  if (!activeCase) {
    return null;
  }

  return (
    <>
      <header className={redactorToolsHeader}>
        {/* <button type="button" onClick={handleBack} title="Back to home screen">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button> */}
        <h3>Record ID: {activeCase}</h3>
        <button
          className={selectedfaEllipsisVIcon}
          onClick={() => setShowModal(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </header>
      {showModal && (
        <Modal>
          <Dialog width="650px">
            <header>
              <h3>Edit Record ID</h3>
              <p>
                If you are using a System to manage your patients and already
                have an ID for this patient, please enter it
              </p>
            </header>
            <TextInput
              id="inputID"
              placeholder="Enter A Record ID"
              onChange={onChangeHandler}
              value={externalInpuValue}
            />
            <Button type="button" className={ModalButton} onClick={onSubmit}>
              Save Record ID
            </Button>
            <br />
            <Button
              type="button"
              className={ModalButton}
              onClick={() => setShowModal(false)}
            >
              Cancel
            </Button>
          </Dialog>
        </Modal>
      )}
    </>
  );
};

RedactorToolsHeader.propTypes = {
  currentRecord: PropTypes.string,
};

export default RedactorToolsHeader;
