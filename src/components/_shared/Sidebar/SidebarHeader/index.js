import React from 'react';
import PropTypes from 'prop-types';

import { sidebarHeader } from './sidebarHeader.module.scss';

const SidebarHeader = ({ title, copy }) => {
  return (
    <header className={sidebarHeader}>
      <h4>{title}</h4>
      <p>{copy}</p>
    </header>
  );
};

SidebarHeader.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
};

export default SidebarHeader;
