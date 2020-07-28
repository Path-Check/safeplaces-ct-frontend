import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Navigation from 'components/_global/Navigation';
import Logo from 'components/_shared/Logo';

import { siteHeader, loggedIn } from './header.module.scss';

const Header = ({ isAuthenticated, isOnboarded }) => {
  const classes = classNames({
    [`${siteHeader}`]: true,
    [`${loggedIn}`]: isAuthenticated,
  });

  const renderHeader = isAuthenticated && isOnboarded;

  return renderHeader ? (
    <header className={classes}>
      <Logo maxWidth="272px" />
      <Navigation />
    </header>
  ) : null;
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
};

export default Header;
