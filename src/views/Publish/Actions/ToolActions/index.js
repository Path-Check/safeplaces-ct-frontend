import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../PublishActions.module.scss';
import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';
import applicationActions from 'ducks/application/actions';

const PublishToolActions = () => {
  const dispatch = useDispatch();

  return (
    <div className={sidebarActions}>
      <Button
        onClick={() =>
          dispatch(applicationActions.updateStatus('SUBMIT FOR PUBLISHING'))
        }
      >
        Submit Data For Publishing
      </Button>
      {/* <Button secondary>Save Changes</Button> */}
    </div>
  );
};

PublishToolActions.propTypes = {};

export default PublishToolActions;
