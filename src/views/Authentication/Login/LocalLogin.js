import React from 'react';
import { connect } from 'react-redux';
import PageTitle from '../PageTitle';
import bcryptjs from 'bcryptjs';

import { compose } from 'redux';
import { iconWfpLogoVerticalEn } from '@wfp/icons';
import attendanceIcon from 'images/corn-bag.svg';
import { withRouter, Link } from 'react-router-dom';
import styles from './login.module.scss';

import { Controller, ErrorMessage, useForm } from 'react-hook-form';
import { prepareForm } from 'helpers/formHelpers';

import { Button, TextInput, Icon, Select, SelectItem } from '@wfp/ui';

import Empty from 'components/Empty';
import { NavLink } from 'react-router-dom/cjs/react-router-dom.min';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const LocalLogin = props => {
  const {
    auth,
    currentSchool,
    history,
    localAuth,
    loginLocal,
    logoutLocal,
  } = props;
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  if (auth.user) logoutLocal();

  // props.disableLogout();
  const methods = useForm({
    defaultValues: prepareForm(),
  });

  const { control, handleSubmit, errors } = methods;

  const onSubmit = async values => {
    if (
      bcryptjs.compareSync(values.password, localAuth[values.username].password)
    ) {
      loginLocal(values.username);
      history.push(`/school/${currentSchool.id}`);
    }
  };

  if (!currentSchool || !localAuth) {
    return (
      <Empty
        button={
          <>
            <NavLink to={'/login'}>
              <Button
                kind="accent"
                iconReverse
                icon={<FontAwesomeIcon icon={faPlus} />}
              >
                Login
              </Button>
            </NavLink>
          </>
        }
        title="Local login not available"
        kind="large"
        icon={
          <img
            alt="attendance empty illustration a bag of rice"
            src={attendanceIcon}
            style={{
              marginLeft: '1%',
              marginRight: '3%',
              marginBottom: '1%',
            }}
          />
        }
      >
        Please use the online login
      </Empty>
    );
  }
  return (
    <div className={styles.login}>
      <div className={styles.loginForm}>
        <div className={styles.loginLogo}>
          <Icon icon={iconWfpLogoVerticalEn} />
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* {error && <Blockquote warning>{error}</Blockquote>} */}
            <PageTitle>{currentSchool.name}</PageTitle>
            <ErrorMessage errors={errors} name="username" />

            <Controller
              as={
                <Select
                  autocorrect="off"
                  autoCapitalize="off"
                  labelText="username"
                  id="username"
                >
                  {Object.entries(localAuth).map(e => (
                    <SelectItem value={e[0]} text={e[0]} />
                  ))}
                </Select>
              }
              name="username"
              defaultValue={Object.keys(localAuth)[0]}
              control={control}
            />
            <Controller
              as={
                <TextInput
                  autocorrect="off"
                  autoCapitalize="off"
                  id="password"
                  labelText="Passwort"
                  type="password"
                />
              }
              name="password"
              defaultValue=""
              control={control}
            />
            <div className={styles.submitWrapper}>
              <div className={styles.button}>
                <Button type="submit">Submit data</Button>
                {/* {loading && <InlineLoading />} */}
              </div>
              <Link to="/requestpassword" className={styles.password}>
                Request new password
              </Link>
            </div>
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

const mapStateToProps = state => {
  return {
    fetching: state.fetching,
    currentSchool: state.currentSchool,
    auth: state.auth,
    localAuth: state.localAuth,
    schools: state.schools,
    error: state.error,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loginLocal: value => dispatch({ type: 'LOGIN_LOCAL', data: value }),
    logoutLocal: () => dispatch({ type: 'LOGOUT_LOCAL' }),
    disableLogout: () => dispatch({ type: 'LOGOUT', data: false }),
  };
};

export default compose(
  withRouter,
  connect(mapStateToProps, mapDispatchToProps),
)(LocalLogin);
