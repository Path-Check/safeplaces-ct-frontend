import React from 'react';
import PropTypes from 'prop-types';

import { NavLink } from 'react-router-dom';

import styles from './navigation.module.scss';

const Navigation = ({ isAdmin }) => {
  return (
    <nav>
      <ul className={styles.navMenu}>
        <li>
          {isAdmin ? (
            <NavLink
              className={styles.navMenuItem}
              activeClassName={styles.active}
              to="/publish"
            >
              Publish Data
            </NavLink>
          ) : (
            <NavLink
              className={styles.navMenuItem}
              activeClassName={styles.active}
              to="/contact-trace"
            >
              Contact Trace
            </NavLink>
          )}
        </li>
        <li>
          <NavLink
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

Navigation.propTypes = {
  isAdmin: PropTypes.bool,
};

export default Navigation;
