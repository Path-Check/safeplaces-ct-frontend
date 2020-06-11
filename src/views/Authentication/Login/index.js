import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { InlineLoading, TextInput } from '@wfp/ui';
import { useHistory, useLocation } from 'react-router-dom';
import styles from './login.module.scss';
import loginImage from '../../../assets/images/home-page-graphic.png';

import authSelectors from 'ducks/auth/selectors';
import Button from 'components/_shared/Button';

import authActions from 'ducks/auth/actions';

const Login = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => authSelectors.getCurrentUser(state));
  const token = useSelector(state => authSelectors.getToken(state));
  const { fetching } = useSelector(state => authSelectors.getLoginState(state));
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const location = useLocation();

  useEffect(() => {
    if (currentUser) {
      const { completedOnboarding } = currentUser;
      console.log(history);

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
      <div className={styles.loginContent}>
        <img src={loginImage} alt="hero" />
      </div>
      <div className={styles.loginFormContainer}>
        <div className={styles.loginForm}>
          <div className={styles.title}>Login</div>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* {errorResponse && <Blockquote warning>{errorResponse}</Blockquote>} */}
            <TextInput
              id="email-input"
              onChange={onEmail}
              autoCorrect="off"
              autoCapitalize="off"
              labelText="Email"
              inputRef={register({ required: 'Please enter a email' })}
              name="username"
              invalid={errors.username}
              invalidText={errors.username && errors.username.message}
            />

            <TextInput
              id="pass-input"
              onChange={onPassword}
              autoCorrect="off"
              autoCapitalize="off"
              labelText="Password"
              inputRef={register}
              type="password"
              name="password"
            />
            <div className={styles.submitWrapper}>
              <div className={styles.buttonContainer}>
                <Button width="100%" height="72px" type="submit">
                  {fetching ? (
                    <div className={styles.loadingContainer}>
                      <InlineLoading className={styles.loading} />
                    </div>
                  ) : (
                    'Log in'
                  )}
                </Button>
              </div>
              {/* Since we are Persisting the state its not needed for now
              <div className={styles.rememberMeContainer}>
                <Checkbox
                  label="Remember Me"
                  id="rememberMe"
                  onChange={test => console.log(test)}
                />
              </div> */}
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
