import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';

const TracerLoadActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Add New Record</Button>
      <Button secondary>Load Existing Record</Button>
    </div>
  );
};

TracerLoadActions.propTypes = {};

export default TracerLoadActions;
