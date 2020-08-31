import React from 'react';

import { sidebarActions } from 'views/ViewWrapper.module.scss';
import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';

const PublishLoadActions = () => {
  const dispatch = useDispatch();

  return (
    <div className={sidebarActions}>
      <Button
        id="load-data-for-publishing"
        onClick={() => dispatch(casesActions.fetchCases())}
      >
        Load Data For Publishing
      </Button>
    </div>
  );
};

PublishLoadActions.propTypes = {};

export default PublishLoadActions;
