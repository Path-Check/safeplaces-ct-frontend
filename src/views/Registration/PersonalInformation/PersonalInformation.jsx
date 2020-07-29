import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import emailValidator from 'helpers/emailValidator';
import registrationActions from 'ducks/registration/actions';
import { useDispatch } from 'react-redux';
import PasswordInput from 'components/_shared/PasswordInput';

const PersonalInformation = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [formValues, setFormValues] = useState({});
  const fetching = false;
  const { handleSubmit, errors, register } = useForm({});
  const dispatch = useDispatch();

  const onChange = ({ target: { value, name } }) => {
    if (formValues?.username?.length) {
      setIsValidEmail(emailValidator(formValues.username));
    }

    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const onSubmit = async () => {
    if (!isValidEmail) return;

    dispatch(registrationActions.submitInformation(formValues));
  };

  return (
    <FormWrapper
      title="Account Setup - Step 1"
      intro="Please enter your information"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="email-input"
          onChange={onChange}
          autoCorrect="off"
          autoCapitalize="off"
          labelText="Email"
          inputRef={register({ required: 'Please enter an email' })}
          name="username"
          invalid={
            errors.username || (formValues?.username?.length && !isValidEmail)
          }
          invalidText={
            (errors.username && errors.username.message) ||
            'Please enter a valid email'
          }
        />
        <TextInput
          id="firstname-input"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={onChange}
          labelText="First Name"
          placeholder="David"
          inputRef={register({ required: 'Please enter your first name' })}
          name="firstname"
          invalid={errors.firstname}
          invalidText={
            (errors.firstname && errors.firstname.message) ||
            'Please enter your first name'
          }
        />
        <TextInput
          id="lastname-input"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={onChange}
          labelText="Last Name"
          placeholder="Jones"
          inputRef={register({ required: 'Please enter your last name' })}
          name="lastname"
          invalid={errors.lastname}
          invalidText={
            (errors.lastname && errors.lastname.message) ||
            'Please enter your last name'
          }
        />
        <TextInput
          id="cellphone-input"
          autoCorrect="off"
          autoCapitalize="off"
          onChange={onChange}
          labelText="Cell number"
          inputRef={register({
            required: 'Please enter your cellphone number',
          })}
          name="cellphone"
          invalid={errors.cellphone}
          invalidText={
            (errors.cellphone && errors.cellphone.message) ||
            'Please enter your cellphone number'
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
        <div className={styles.submitWrapper}>
          <div className={styles.buttonContainer}>
            <Button id="login-button" height="16px" type="submit">
              {fetching ? (
                <div className={styles.loadingContainer}>
                  <InlineLoading className={styles.loading} />
                </div>
              ) : (
                'Create Account'
              )}
            </Button>
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default PersonalInformation;
