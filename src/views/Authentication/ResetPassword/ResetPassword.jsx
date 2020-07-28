import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import TextInput from '@wfp/ui/lib/components/TextInput';
import Button from 'components/_shared/Button';

import applicationActions from 'ducks/application/actions';
import FormWrapper from 'components/_shared/Forms/FormWrapper';
import authActions from 'ducks/auth/actions';
import { useValidatePassword } from 'hooks/useValidatePassword';

const ResetPassword = ({ status }) => {
  const dispatch = useDispatch();
  const [password, setPassword] = useState('');
  const [passwordValid] = useValidatePassword(password);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [canSubmit, setCanSubmit] = useState(false);
  const isResetting = status === 'RESETTING PASSWORD';

  const handleSumbit = e => {
    e.preventDefault();

    if (!passwordValid && confirmPassword !== password) {
      return;
    }

    dispatch(authActions.resetPassword(password));
  };

  useEffect(() => {
    if (passwordValid && confirmPassword === password) {
      setCanSubmit(true);
    } else {
      setCanSubmit(false);
    }
  }, [password, confirmPassword, passwordValid]);

  return (
    <FormWrapper
      title="Reset your password"
      intro="Enter the email address associated with your account, and we’ll email you a link to reset your password."
    >
      <form onSubmit={handleSumbit}>
        <TextInput
          id="new-password"
          labelText="Password"
          type="text"
          required
          name="newPassword"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <TextInput
          id="confirm-new-password"
          labelText="Confirm Password"
          type="text"
          required
          name="confirmPassword"
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        <Button loading={isResetting} disabled={!canSubmit} type="submit">
          Reset Password
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ResetPassword;
