import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Blockquote, InlineLoading, TextInput } from '@wfp/ui';
import { Link, useHistory } from 'react-router-dom';
import styles from './login.module.scss';
import loginImage from '../../assets/images/home-page-graphic.png';
import { getLoginState, getToken, requestLogin } from 'ducks/auth';
import Button from '../Button';
import Checkbox from '../Checkbox/Checkbox';

const Login = () => {
  const dispatch = useDispatch();
  const token = useSelector(state => getToken(state));
  const { fetching, errorResponse } = useSelector(state =>
    getLoginState(state),
  );
  const history = useHistory();

  useEffect(() => {
    if (token) {
      history.push('');
    }
  }, [token, history]);

  const { handleSubmit, errors, register } = useForm({});

  const onSubmit = async values => {
    dispatch(requestLogin(values));
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
            {errorResponse && <Blockquote warning>{errorResponse}</Blockquote>}

            <TextInput
              autocorrect="off"
              autoCapitalize="off"
              labelText="Email"
              inputRef={register({ required: 'Please enter a email' })}
              name="username"
              invalid={errors.username}
              invalidText={errors.username && errors.username.message}
            />

            <TextInput
              autocorrect="off"
              autoCapitalize="off"
              labelText="Password"
              inputRef={register}
              type="password"
              name="password"
            />
            <Link to="/requestpassword" className={styles.password}>
              Request new password
            </Link>
            <div className={styles.submitWrapper}>
              <div className={styles.buttonContainer}>
                <Button
                  text="Log in"
                  onClick={onSubmit}
                  width="100%"
                  height="72px"
                />
                {fetching && <InlineLoading />}
              </div>
              <div className={styles.rememberMeContainer}>
                <Checkbox
                  label="Remember Me"
                  onChange={test => console.log(test)}
                />
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
