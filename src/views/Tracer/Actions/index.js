import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from './TracerActions.module.scss';
import Button from 'components/Button';

const TracerActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Stage for Publishing</Button>
      <Button secondary>Save Session</Button>
    </div>
  );
};

TracerActions.propTypes = {};

export default TracerActions;
