import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Blockquote, Button, TextInput, Icon, InlineLoading } from "@wfp/ui";
import { useHistory } from "react-router-dom";
import styles from "./login.module.scss";
import { Link } from "react-router-dom";
import { requestLogin, getCurrentUser, getLoginState } from "ducks/auth";

const Login = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => getCurrentUser(state));
  const { fetching, errorResponse } = useSelector((state) =>
    getLoginState(state)
  );
  const history = useHistory();

  useEffect(() => {
    if (currentUser) {
      history.push("");
    }
  }, [currentUser, history]);

  const { control, handleSubmit, errors, register } = useForm({});

  const onSubmit = async (values) => {
    dispatch(requestLogin(values));
  };

  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {errorResponse && <Blockquote warning>{errorResponse}</Blockquote>}

          <TextInput
            autocorrect="off"
            autoCapitalize="off"
            labelText="Email"
            inputRef={register({
              required: "Please enter a email",
            })}
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
          <div className={styles.submitWrapper}>
            <div className={styles.button}>
              <Button type="submit">Sign in</Button>
              {fetching && <InlineLoading />}
            </div>
            <Link to="/requestpassword" className={styles.password}>
              Request new password
            </Link>
          </div>
        </form>
      </div>
      <div className={styles.loginContent}>
        <h2>
          Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
          nonumy eirmod tempor invidunt
        </h2>
        <p>
          Consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
          labore et dolore magna aliquyam erat, sed diam voluptua.
        </p>
      </div>
    </div>
  );
};

export default Login;
