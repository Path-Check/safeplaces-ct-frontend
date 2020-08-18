import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './navigation.module.scss';
import { useSelector } from 'react-redux';
import authSelectors from '../../../ducks/auth/selectors';

const Navigation = () => {
  const { role } = useSelector(authSelectors.getCurrentUser);
  return (
    <nav>
      <ul className={styles.navMenu}>
        <li>
          <NavLink
            id="contact-trace"
            className={styles.navMenuItem}
            activeClassName={styles.active}
            to="/trace"
          >
            Contact Trace
          </NavLink>
          {role && role !== 'contact_tracer' && (
            <NavLink
              id="publish-data"
              className={styles.navMenuItem}
              activeClassName={styles.active}
              to="/publish"
            >
              Publish Data
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
            id="settings"
            className={styles.navMenuItem}
            activeClassName={styles.active}
            strict
            to="/settings/"
          >
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
