import React from 'react';
import PropTypes from 'prop-types';

import { sidebarHeader } from './sidebarHeader.module.scss';

const SidebarHeader = ({ title, intro }) => {
  return (
    <header className={sidebarHeader}>
      {title && <h4>{title}</h4>}
      {intro && <p>{intro}</p>}
    </header>
  );
};

SidebarHeader.propTypes = {
  title: PropTypes.string,
  copy: PropTypes.string,
};

export default SidebarHeader;
