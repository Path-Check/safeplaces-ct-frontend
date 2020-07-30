import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import authActions from 'ducks/auth/actions';
import { useValidatePassword } from 'hooks/useValidatePassword';
import PasswordStrengthIndicator from 'components/_shared/PasswordStrengthIndicator';

import PasswordInput from 'components/_shared/PasswordInput';

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
        <PasswordInput
          id="new-password"
          label="Password"
          required
          name="newPassword"
          onChange={({ target: { value } }) => setPassword(value)}
        />
        <PasswordInput
          id="confirm-new-password"
          label="Confirm Password"
          required
          name="confirmPassword"
          onChange={({ target: { value } }) => setConfirmPassword(value)}
        />
        {passwordValid && confirmPassword && confirmPassword !== password && (
          <p style={{ color: 'red' }}>Passwords do not match</p>
        )}
        <PasswordStrengthIndicator password={password} />
        <Button loading={isResetting} disabled={!canSubmit} type="submit">
          Reset Password
        </Button>
      </form>
    </FormWrapper>
  );
};

export default ResetPassword;
