import Modal from '../../../../components/_global/Modal';
import React from 'react';
import {
  container,
  title,
  subtitle,
  textInput,
  linkContainer,
  linkExpires,
} from './styles.module.scss';
import { TextInput } from '@wfp/ui';
import Button from '../../../../components/_shared/Button';
import applicationActions from '../../../../ducks/application/actions';
import { useDispatch } from 'react-redux';

const CopyLink = ({ email, showModal, closeModal, newUser }) => {
  const dispatch = useDispatch();
  const copyText = () => {
    const copyText = document.getElementById('linkInput');
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand('copy');
    dispatch(applicationActions.notification({ title: 'Copied!' }));
  };

  return newUser && newUser.redirectUrl && showModal ? (
    <Modal closeAction={closeModal}>
      <div className={container}>
        <h3 className={title}>Share this link with the new member</h3>
        <p className={subtitle}>
          {`The new member ${email} needs to create their
            account following this link.`}
        </p>
        <div className={linkContainer}>
          <TextInput
            id="linkInput"
            className={textInput}
            hideLabel
            labelText=""
            autoCorrect="off"
            autoCapitalize="off"
            name="email"
            type="text"
            readonly="readonly"
            onClick={copyText}
            defaultValue={newUser.redirectUrl}
          />
          <Button primary onClick={copyText}>
            Copy Link
          </Button>
        </div>
        <p className={linkExpires}>The link expires after 5 days</p>
      </div>
    </Modal>
  ) : null;
};
export default CopyLink;
