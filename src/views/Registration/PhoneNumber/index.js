import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import registrationActions from 'ducks/registration/actions';
import { useDispatch, useSelector } from 'react-redux';
import registrationSelectors from '../../../ducks/registration/selectors';

const PhoneNumber = () => {
  const fetching = false;
  const dispatch = useDispatch();
  const authorization = useSelector(registrationSelectors.getMFAToken);
  const [phoneNumber, setPhoneNumber] = useState('');
  const { handleSubmit, errors, register } = useForm({});

  const onChange = ({ target: { value } }) => {
    setPhoneNumber(value);
  };

  const onSubmit = async () => {
    if (phoneNumber.length) {
      dispatch(
        registrationActions.submitPhoneNumber({
          phone_number: phoneNumber,
          authorization,
        }),
      );
    }
  };

  return (
    <FormWrapper title="Enable 2-step verification" intro="">
      <p className={styles.subtitle}>
        To protect your account, you’ll be asked for a unique verification code
        that’s sent to your phone each time you are logging into your account.
        <br />
        <br />
        Enter the mobile phone you would like to use.
      </p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextInput
          id="cellphone-input"
          autoCorrect="off"
          autoCapitalize="off"
          placeholder={'+18001357890'}
          onChange={onChange}
          labelText="Phone"
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
        <div className={styles.submitWrapper}>
          <div className={styles.buttonContainer}>
            <Button
              id="login-button"
              height="16px"
              type="submit"
              disabled={!phoneNumber.length}
              loading={fetching}
            >
              Send code via SMS
            </Button>
          </div>
        </div>
      </form>
    </FormWrapper>
  );
};

export default PhoneNumber;
