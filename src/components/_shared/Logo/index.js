import React from 'react';
import { Link } from 'react-router-dom';

import styles from './logo.module.scss';
import pathcheck from '../../../assets/images/pathcheck.png';

const Logo = ({ maxWidth }) => (
  <Link to="/" className={styles.logo}>
    <img
      style={{ maxWidth }}
      className={styles.logo}
      src={pathcheck}
      alt="logo"
    />
  </Link>
);

export default Logo;
