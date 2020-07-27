import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './login.module.scss';
import pathcheck from '../../../assets/images/pathcheck.png';

import authSelectors from 'ducks/auth/selectors';
import Button from 'components/_shared/Button';

import authActions from 'ducks/auth/actions';
import Logo from '../../../components/_global/Logo';
import emailValidator from '../../../helpers/emailValidator';
import applicationActions from 'ducks/application/actions';

const Login = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => authSelectors.getCurrentUser(state));
  const token = useSelector(state => authSelectors.getToken(state));
  const { fetching } = useSelector(state => authSelectors.getLoginState(state));
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const { completedOnboarding } = currentUser;

      if (token && completedOnboarding) {
        history.push(location.state?.referrer || 'trace');
      }
      if (token && !completedOnboarding) {
        history.push('/onboarding');
      }
    }
  }, [token, history, currentUser]);

  const { handleSubmit, errors, register } = useForm({});

  const onEmail = ({ target: { value } }) => {
    if (value.length) {
      setIsValidEmail(emailValidator(value));
    }
    setEmail(value);
  };

  const onPassword = ({ target: { value } }) => {
    setPassword(value);
  };

  const onSubmit = async () => {
    if (email.length && password.length) {
      dispatch(authActions.loginRequest({ username: email, password }));
    }
  };

  return (
    <div className={styles.login}>
      <Logo />
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Log in</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* {errorResponse && <Blockquote warning>{errorResponse}</Blockquote>} */}
            <TextInput
              id="email-input"
              onChange={onEmail}
              autoCorrect="off"
              autoCapitalize="off"
              labelText="Email"
              inputRef={register({ required: 'Please enter an email' })}
              name="username"
              invalid={errors.username || (email.length && !isValidEmail)}
              invalidText={
                (errors.username && errors.username.message) ||
                'Please enter a valid email'
              }
            />

            <TextInput
              id="pass-input"
              onChange={onPassword}
              autoCorrect="off"
              autoCapitalize="off"
              inputRef={register({ required: 'Please enter a password' })}
              labelText="Password"
              type="password"
              name="password"
              invalid={errors.password}
              invalidText={errors.password && errors.password.message}
            />
            <Button
              unstyled
              onClick={() =>
                dispatch(applicationActions.updateStatus('RESET PASSWORD'))
              }
            >
              Forgot password?
            </Button>
            <div className={styles.submitWrapper}>
              <div className={styles.buttonContainer}>
                <Button
                  id="login-button"
                  height="16px"
                  type="submit"
                  disabled={!email.length || !isValidEmail || !password.length}
                >
                  {fetching ? (
                    <div className={styles.loadingContainer}>
                      <InlineLoading className={styles.loading} />
                    </div>
                  ) : (
                    'Log in'
                  )}
                </Button>
              </div>
              <p className={styles.disclaimer}>
                If you are a Health Authority member but you still don’t have an
                account, please contact your HA admin.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
