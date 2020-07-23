import React from 'react';
import Onboarding from 'views/Onboarding';
import styles from './styles.module.scss';
import { NavLink, Redirect, Route, Switch } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import authActions from '../../ducks/auth/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faCog } from '@fortawesome/pro-solid-svg-icons';

const Settings = () => {
  const dispatch = useDispatch();
  return (
    <div className={styles.container}>
      <nav className={styles.sidebarWrapper}>
        <ul className={styles.sidebarContainer}>
          <li>
            <NavLink
              id="configuration"
              className={styles.option}
              to="/settings/organization"
            >
              <FontAwesomeIcon className={styles.icon} icon={faCog} />
              General
            </NavLink>
          </li>
          {/* No designs for account yet.
          <NavLink className={styles.option} to="/settings/organization"> */}
          {/*  <FontAwesomeIcon className={styles.icon} icon={faUser} /> */}
          {/*  Account */}
          {/* </NavLink> */}
          <li>
            <NavLink
              id="logout"
              className={styles.option}
              to="/login"
              onClick={() => dispatch(authActions.logout())}
            >
              <FontAwesomeIcon className={styles.icon} icon={faSignOutAlt} />
              Logout
            </NavLink>
          </li>
        </ul>
      </nav>
      <div className={styles.contentContainer}>
        <Switch>
          <Route path="/settings/configuration" component={Onboarding} />
          <Route>
            <Redirect from="/settings/" to="/settings/configuration" />
          </Route>
        </Switch>
      </div>
    </div>
  );
};

export default Settings;
