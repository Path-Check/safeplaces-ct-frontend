import React from 'react';
import Onboarding from 'views/Onboarding';
import Members from './Members';
import styles from './styles.module.scss';
import classNames from 'classnames';
import {
  NavLink,
  Redirect,
  Route,
  Switch,
  useLocation,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import authActions from '../../ducks/auth/actions';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignOutAlt, faUsers, faCog } from '@fortawesome/pro-solid-svg-icons';
import authSelectors from '../../ducks/auth/selectors';

const Settings = () => {
  const dispatch = useDispatch();
  const { role } = useSelector(authSelectors.getCurrentUser);

  const { pathname } = useLocation();
  const navLinks = [
    {
      id: 'General',
      path: '/settings/general',
      icon: faCog,
      component: Onboarding,
      onClick: null,
    },
    {
      id: 'Members',
      path: '/settings/members',
      icon: faUsers,
      component: Members,
      onClick: null,
      superAdminOnly: true,
    },
    {
      id: 'Logout',
      path: '/login',
      icon: faSignOutAlt,
      onClick: () => dispatch(authActions.logout()),
    },
  ];

  const renderLinks = () => {
    return navLinks.map(
      ({ id, icon, path, onClick, superAdminOnly = false }) => {
        const classes = classNames({
          [`${styles.option}`]: true,
          [`${styles.active}`]: pathname === path,
        });
        return (
          (!superAdminOnly ||
            (superAdminOnly && role && role === 'super_admin')) && (
            <li>
              <NavLink id={id} className={classes} to={path} onClick={onClick}>
                <FontAwesomeIcon className={styles.icon} icon={icon} />
                {id}
              </NavLink>
            </li>
          )
        );
      },
    );
  };

  const renderRoutes = () => {
    const routes = navLinks.map(({ path, component }) => {
      return <Route path={path} component={component} />;
    });
    routes.push(
      <Route>
        <Redirect from="/settings/" to="/settings/general" />
      </Route>,
    );
    return routes;
  };

  return (
    <div className={styles.container}>
      <nav className={styles.sidebarWrapper}>
        <ul className={styles.sidebarContainer}>{renderLinks()}</ul>
      </nav>
      <div className={styles.contentContainer}>
        <Switch>{renderRoutes()}</Switch>
      </div>
    </div>
  );
};

export default Settings;
