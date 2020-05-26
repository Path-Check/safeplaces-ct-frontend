import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../PublishActions.module.scss';
import Button from 'components/_shared/Button';

const PublishLoadActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Load Data For Publishing</Button>
    </div>
  );
};

PublishLoadActions.propTypes = {};

export default PublishLoadActions;
