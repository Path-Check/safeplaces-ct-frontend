import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import Navigation from 'components/_global/Navigation';
import Logo from 'components/_shared/Logo';

import { loggedIn, siteHeader } from './header.module.scss';
import { useLocation } from 'react-router';

const Header = ({ isAuthenticated, isOnboarded }) => {
  const { pathname } = useLocation();
  const classes = classNames({
    [`${siteHeader}`]: true,
    [`${loggedIn}`]: isAuthenticated,
  });

  const renderHeader =
    isAuthenticated && isOnboarded && pathname !== '/registration';
  return renderHeader ? (
    <header className={classes}>
      <Logo maxWidth="272px" />
      <Navigation />
    </header>
  ) : null;
};

Header.propTypes = {
  isAuthenticated: PropTypes.bool,
  isOnboarded: PropTypes.bool,
};

export default Header;
