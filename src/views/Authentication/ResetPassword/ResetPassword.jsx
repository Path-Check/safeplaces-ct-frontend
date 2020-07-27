import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import Modal from 'components/_global/Modal';

import TextInput from '@wfp/ui/lib/components/TextInput';
import Button from 'components/_shared/Button';

import applicationActions from 'ducks/application/actions';
import FormWrapper from 'components/_shared/Forms/FormWrapper';
import authActions from 'ducks/auth/actions';

const ResetPassword = ({ status } => {
  const dispatch = useDispatch();
  const [emailAddress, setEmailAddress] = useState('');
  const isResetting = status === 'RESETTING PASSWORD';
  
  const handleSumbit = e => {
    e.preventDefault();
    dispatch(authActions.resetPassword(emailAddress));
  };

  return (
    <Modal
      style="b"
      closeAction={() => dispatch(applicationActions.updateStatus('IDLE'))}
    >
      <FormWrapper
        title="Forgot your password"
        intro="Enter the email address associated with your account, and we’ll email you a link to reset your password."
      >
        <form onSubmit={handleSumbit}>
          <TextInput
            id="reset-email"
            labelText="Email address"
            type="email"
            required
            name="resetEmail"
            placeholder="tracer@yourha.org"
            onChange={({ target: { value } }) => setEmailAddress(value)}
          />
          <Button type="submit">Send reset link</Button>
        </form>
      </FormWrapper>
    </Modal>
  );
};

export default ResetPassword;
