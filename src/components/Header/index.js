import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import classNames from 'classnames';

import Navigation from 'components/Navigation';
import Logo from 'components/Logo';

import { siteHeader, loggedIn } from './header.module.scss';

const Header = ({ isAuthenticated }) => {
  const classes = classNames({
    [`${siteHeader}`]: true,
    [`${loggedIn}`]: isAuthenticated,
  });

  return (
    <header className={classes}>
      <Logo />
      {isAuthenticated && <Navigation />}
    </header>
  );
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
