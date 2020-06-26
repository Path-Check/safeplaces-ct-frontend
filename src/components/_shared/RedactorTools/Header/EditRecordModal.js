import React from 'react';
import Modal from '../../../_global/Modal';
import Dialog from '../../Dialog';
import { TextInput } from '@wfp/ui';
import { inputText, ModalButton } from './header.module.scss';
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
      <Dialog width="650px">
        <header>
          <h3>Edit Record ID</h3>
          <p>
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
          <Button type="button" onClick={onSubmit}>
            Save Record ID
          </Button>
          <br />
          <Button type="button" secondary onClick={() => setShowModal(false)}>
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  ) : null;
};

export default EditRecordModal;
