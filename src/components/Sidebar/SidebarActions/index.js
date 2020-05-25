import React from 'react';
import PropTypes from 'prop-types';

import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import { sidebarActions } from './sidebarActions.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/Button';

const SidebarActions = ({ isAdmin }) => {
  return (
    <div className={sidebarActions}>
      {!isAdmin && (
        <Button>
          <FontAwesomeIcon icon={faPlus} />
          Create New Record
        </Button>
      )}

      <Button secondary>Load Data for Publishing</Button>
    </div>
  );
};

SidebarActions.propTypes = {
  isAdmin: PropTypes.bool,
};

export default SidebarActions;
