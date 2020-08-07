import React from 'react';
import classNames from 'classnames';

import {
  sidebarActions,
  sidebarActionsPadded,
} from 'views/ViewWrapper.module.scss';

import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';
import applicationActions from 'ducks/application/actions';
import { applicationStates } from 'types/applicationStates';

const PublishToolActions = () => {
  const dispatch = useDispatch();

  const classes = classNames({
    [`${sidebarActions}`]: true,
    [`${sidebarActionsPadded}`]: true,
  });

  return (
    <div className={classes}>
      <Button
        id="submit-data-publishing"
        onClick={() =>
          dispatch(
            applicationActions.updateStatus(
              applicationStates.SUBMIT_FOR_PUBLISHING,
            ),
          )
        }
      >
        Submit All Data For Publishing
      </Button>
      {/* <Button secondary>Save Changes</Button> */}
    </div>
  );
};

PublishToolActions.propTypes = {};

export default PublishToolActions;
