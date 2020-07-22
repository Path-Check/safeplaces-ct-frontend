import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import {
  sidebarWrapper,
  sidebarWrapperPadded,
} from './sidebarWrapper.module.scss';

const SidebarWrapper = ({ children, isPadded }) => {
  const classes = classNames({
    [`${sidebarWrapper}`]: true,
    [`${sidebarWrapperPadded}`]: isPadded,
  });

  return <aside className={classes}>{children}</aside>;
};

SidebarWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SidebarWrapper;
