import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../PublishActions.module.scss';
import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';

const PublishLoadActions = () => {
  const dispatch = useDispatch();

  return (
    <div className={sidebarActions}>
      <Button onClick={() => dispatch(casesActions.fetchCases())}>
        Load Data For Publishing
      </Button>
    </div>
  );
};

PublishLoadActions.propTypes = {};

export default PublishLoadActions;
