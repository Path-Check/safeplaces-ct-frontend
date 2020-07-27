import React, { useState } from 'react';

import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import registrationActions from 'ducks/registration/actions';
import { useDispatch } from 'react-redux';

const AccessCode = () => {
  const dispatch = useDispatch();
  const [accessCode, setAccessCode] = useState();
  const fetching = false;
  const { handleSubmit, errors, register } = useForm({});

  const onChange = ({ target: { value } }) => setAccessCode(value);

  const onSubmit = async () => {
    dispatch(registrationActions.submitAccessCode(accessCode));
  };

  return (
    <FormWrapper
      title="Account Setup - Step 2"
      intro="Please enter your access code"
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="code-input"
          onChange={onChange}
          autoCorrect="off"
          autoCapitalize="off"
          labelText="Code"
          inputRef={register({ required: 'Please enter your access code' })}
          name="accessCode"
          invalid={errors.accessCode}
          invalidText={'Please enter your access code'}
        />

        <div className={styles.submitWrapper}>
          <div className={styles.buttonContainer}>
            <Button
              id="login-button"
              height="16px"
              type="submit"
              disabled={!accessCode}
            >
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
