import React from 'react';
import Modal from '../../../_global/Modal';
import Dialog from '../../Dialog';
import { TextInput } from '@wfp/ui';
import { inputText, ModalButton, dialogText, dialogTitle, dialogButton } from './header.module.scss';
import Button from 'components/_shared/Button';

const EditRecordModal = ({
  showModal,
  onChangeHandler,
  externalInputValue,
  onSubmit,
  setShowModal,
}) => {
  return showModal ? (
    <Modal closeAction={() => setShowModal(false)}>
      <Dialog width="500px">
        <header>
          <h3 className={dialogTitle}>Edit Record ID</h3>
          <p className={dialogText}>
            If you are using a system to manage your patients and already have
            an ID for this patient, please enter it below.
          </p>
        </header>
        <TextInput
          className={inputText}
          placeholder="Enter A Record ID"
          onChange={onChangeHandler}
          value={externalInputValue}
          labelText=""
          id="recordId"
        />
        <div className={ModalButton}>
          <Button className={dialogButton} type="button" secondary onClick={() => setShowModal(false)}>
            Cancel
          </Button>
          <Button className={dialogButton} type="button" onClick={onSubmit}>
            Save changes
          </Button>
        </div>
      </Dialog>
    </Modal>
  ) : null;
};

export default EditRecordModal;
