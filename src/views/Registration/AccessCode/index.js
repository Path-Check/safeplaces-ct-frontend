import React, { useEffect, useState } from 'react';

import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import styles from '../Registration.module.scss';

import Button from 'components/_shared/Button';

import FormWrapper from 'components/_shared/Forms/FormWrapper';
import registrationActions from 'ducks/registration/actions';
import { useDispatch, useSelector } from 'react-redux';
import registrationSelectors from '../../../ducks/registration/selectors';
import { useHistory } from 'react-router';

const AccessCode = () => {
  const dispatch = useDispatch();
  const { push } = useHistory();
  const { phoneNumber, mfaToken, oobCode } = useSelector(
    registrationSelectors.getRegistration,
  );
  const [counter, setCounter] = React.useState(60);
  const [accessCode, setAccessCode] = useState();
  const [accessCodeSent, setAccessCodeSent] = useState(false);
  const fetching = false;
  const { handleSubmit, errors, register } = useForm({});

  useEffect(() => {
    accessCodeSent &&
      setTimeout(() => {
        setCounter(counter - 1);
        if (counter === 0) {
          setAccessCodeSent(false);
        }
      }, 1000);
  }, [counter, accessCodeSent]);

  const onChange = ({ target: { value } }) => setAccessCode(value);

  const onSubmit = async () => {
    dispatch(
      registrationActions.submitAccessCode({
        binding_code: accessCode,
        authorization: mfaToken,
        oob_code: oobCode,
      }),
    );
  };

  const resendCode = () => {
    if (!accessCodeSent) {
      dispatch(
        registrationActions.submitPhoneNumber({
          phone_number: phoneNumber,
          authorization: mfaToken,
        }),
      );
      setAccessCodeSent(true);
    }
  };

  return (
    <div>
      <FormWrapper
        title="Enter your verification code"
        intro={`Input the verification code we sent to ${phoneNumber} to verify your
        identity.`}
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
                  'Verify'
                )}
              </Button>
              <Button
                onClick={resendCode}
                id="login-button"
                height="16px"
                type="submit"
                unstyled
              >
                {accessCodeSent ? `Try again in ${counter}` : 'Resend code'}
              </Button>
            </div>
          </div>
        </form>
        <Button
          onClick={() => push('/phone')}
          className={styles.differentNumber}
          id="login-button"
          height="16px"
          type="submit"
          unstyled
        >
          Use a different phone number
        </Button>
      </FormWrapper>
    </div>
  );
};

export default AccessCode;
