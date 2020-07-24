import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import emailValidator from 'helpers/emailValidator';

const AccessCode = () => {
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [formValues, setFormValues] = useState({});
  const fetching = false;
  const { handleSubmit, errors, register } = useForm({});

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

    console.log('SUBMIT');
  };

  return (
    <FormWrapper title="Setup Your Account">
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="code-input"
          onChange={onChange}
          autoCorrect="off"
          autoCapitalize="off"
          labelText="Code"
          inputRef={register({ required: 'Please enter your access code' })}
          name="code"
          invalid={
            errors.username || (formValues?.username?.length && !isValidEmail)
          }
          invalidText={'Please enter your access code'}
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

export default AccessCode;
