import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../PublishActions.module.scss';
import Button from 'components/_shared/Button';

const PublishToolActions = () => {
  return (
    <div className={sidebarActions}>
      <Button>Submit Data For Publishing</Button>
      {/* <Button secondary>Save Changes</Button> */}
    </div>
  );
};

PublishToolActions.propTypes = {};

export default PublishToolActions;
