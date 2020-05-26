import React from 'react';
import PropTypes from 'prop-types';

import { sidebarWrapper } from './sidebarWrapper.module.scss';

const SidebarWrapper = ({ children }) => {
  return <aside className={sidebarWrapper}>{children}</aside>;
};

SidebarWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
};

export default SidebarWrapper;
