import React, { useEffect, useState } from 'react';
import queryString from 'querystring';
import { useForm } from 'react-hook-form';
import { TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import registrationActions from 'ducks/registration/actions';
import { useDispatch } from 'react-redux';
import PasswordInput from 'components/_shared/PasswordInput';
import PasswordStrengthIndicator from 'components/_shared/PasswordStrengthIndicator';
import { useValidatePassword } from 'hooks/useValidatePassword';
import { useLocation } from 'react-router';

const PersonalInformation = () => {
  const fetching = false;
  const dispatch = useDispatch();
  const { search } = useLocation();
  const [formValues, setFormValues] = useState({});
  const [passwordValid] = useValidatePassword(formValues?.password);
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const { handleSubmit, errors, register } = useForm({});
  const { t } = queryString.parse(search.substr(1));

  useEffect(() => {
    if (formValues.confirmPassword === formValues.password) {
      setPasswordsMatch(true);
    } else {
      setPasswordsMatch(false);
    }
  }, [formValues]);

  const onChange = ({ target: { value, name } }) => {
    setFormValues({ ...formValues, [name]: value });
  };

  const onSubmit = async () => {
    dispatch(
      registrationActions.submitInformation({
        ...formValues,
        authorization: t,
      }),
    );
  };

  return (
    <FormWrapper title="Create your account" intro="">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="name-input"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={onChange}
          labelText="Full Name"
          placeholder="David Jones"
          inputRef={register({ required: 'Please enter your full name' })}
          name="name"
          invalid={errors.name}
          invalidText={
            (errors.name && errors.name.message) ||
            'Please enter your first name'
          }
        />
        <PasswordInput
          onChange={onChange}
          id="pass-input"
          autoCorrect="off"
          autoCapitalize="off"
          inputRef={register({ required: 'Please enter a password' })}
          label="Password"
          name="password"
          invalid={errors.password}
          invalidText={errors.password && errors.password.message}
        />
        <PasswordInput
          onChange={onChange}
          id="confirm-input"
          autoCorrect="off"
          autoCapitalize="off"
          inputRef={register({ required: 'Please enter a password' })}
          label="Confirm Password"
          name="confirmPassword"
          invalid={errors.confirmPassword}
          invalidText={errors.confirmPassword && errors.confirmPassword.message}
        />
        <PasswordStrengthIndicator
          passwordsMatch={passwordsMatch}
          password={formValues.password}
        />
        <div className={styles.submitWrapper}>
          <div className={styles.buttonContainer}>
            <Button
              id="login-button"
              height="16px"
              type="submit"
              disabled={!passwordValid || !passwordsMatch}
              loading={fetching}
            >
              Create account
            </Button>
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default PersonalInformation;
