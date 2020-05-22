import React from 'react';
import PropTypes from 'prop-types';

import { sidebarHeader } from './sidebarHeader.module.scss';

const SidebarHeader = ({ copy, isAdmin }) => {
  return (
    <header className={sidebarHeader}>
      <h4>Contact Trace{isAdmin && ', Admin'}</h4>
      <p>{copy}</p>
    </header>
  );
};

SidebarHeader.propTypes = {
  copy: PropTypes.string,
  isAdmin: PropTypes.bool,
};

export default SidebarHeader;
