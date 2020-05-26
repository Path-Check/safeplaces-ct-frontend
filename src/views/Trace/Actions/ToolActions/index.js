import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';

const TracerToolActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Stage for Publishing</Button>
      <Button secondary>Save Session</Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
