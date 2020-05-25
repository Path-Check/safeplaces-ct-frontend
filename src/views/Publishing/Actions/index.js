import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from './PublishingActions.module.scss';
import Button from 'components/Button';

const PublishingActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Download Data for Publishing</Button>
      <Button secondary>Save Changes</Button>
    </div>
  );
};

PublishingActions.propTypes = {};

export default PublishingActions;
