import React from 'react';
import PropTypes from 'prop-types';

import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import { Button } from '@wfp/ui';
import { sidebarActions } from './sidebarActions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const SidebarActions = ({ isAdmin }) => {
  return (
    <div className={sidebarActions}>
      {!isAdmin && (
        <Button icon={<FontAwesomeIcon icon={faPlus} />}>
          Create New Record
        </Button>
      )}
      <Button kind="secondary">Load Data from Database</Button>
    </div>
  );
};

SidebarActions.propTypes = {
  isAdmin: PropTypes.bool,
};

export default SidebarActions;
