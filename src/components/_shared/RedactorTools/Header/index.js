import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch } from 'react-redux'
import {
  redactorToolsHeader,
  selectedfaEllipsisVIcon,
  ModalButton,
  inputText,
  selectedEditContextMenu,
  selectedEditContextMenuAction
} from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faEllipsisV, faEdit } from '@fortawesome/pro-solid-svg-icons';
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
  const [showEditRecordButton, setEditRecordButton] = useState(false);
  const [externalInpuValue, setInputValue] = useState("");

  const handleBack = () => console.log('go back');
  const onChangeHandler = (event) => {
    setInputValue(event.target.value);
  };

  const onSubmit = async () => {
    if (activeCase) {
      dispatch(caseAction.updExternalCaseIdRequest(externalInpuValue));
    }
  };

  if (!activeCase) {
    return null;
  }

  const EditRecordButton = () => (
    <div className={selectedEditContextMenu}>
      <ul>
        <li>
          <button
            className={selectedEditContextMenuAction}
            type="button"
            onClick={() => {
              setShowModal(true);
              setEditRecordButton(false);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit Record ID
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <header className={redactorToolsHeader}>
        {/* <button type="button" onClick={handleBack} title="Back to home screen">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button> */}
        <h3>Record ID: {activeCase}</h3>
        <button
          className={selectedfaEllipsisVIcon}
          //onClick={() => setShowModal(true)}
          onClick={() => setEditRecordButton(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </header>

      {showEditRecordButton && (<EditRecordButton />)}
      {showModal && (
        <Modal>
          <Dialog width="650px">
            <header>
              <h3>Edit Record ID</h3>
              <p>
                If you are using a system to manage your patients and already
                have an ID for this patient, please enter it below.
              </p>
            </header>
            <TextInput
              className={inputText}
              placeholder="Enter A Record ID"
              onChange={onChangeHandler}
              value={externalInpuValue}
            />
            <div className={ModalButton}>
              <Button
                type="button"
                onClick={onSubmit}
              >
                Save Record ID
              </Button>
              <br />
              <Button
                type="button"
                style={{ background: '#f8f8ff', borderColor: '#6979f8', color: '#6979f8' }}
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
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
