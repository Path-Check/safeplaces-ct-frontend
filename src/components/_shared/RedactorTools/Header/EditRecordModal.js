import React from 'react';
import Modal from '../../../_global/Modal';
import Dialog from '../../Dialog';
import { Button, TextInput } from '@wfp/ui';
import { inputText, ModalButton } from './header.module.scss';

const EditRecordModal = ({
  showModal,
  onChangeHandler,
  externalInputValue,
  onSubmit,
  setShowModal,
}) => {
  return showModal ? (
    <Modal>
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
        />
        <div className={ModalButton}>
          <Button type="button" onClick={onSubmit}>
            Save Record ID
          </Button>
          <br />
          <Button
            type="button"
            style={{
              background: '#f8f8ff',
              borderColor: '#6979f8',
              color: '#6979f8',
            }}
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
        </div>
      </Dialog>
    </Modal>
  ) : null;
};

export default EditRecordModal;
