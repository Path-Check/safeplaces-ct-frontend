import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';

import casesActions from 'ducks/cases/actions';

const TracerLoadActions = () => {
  const dispatch = useDispatch();

  return (
    <div className={sidebarActions}>
      <Button onClick={() => dispatch(casesActions.fetchCase())}>
        Add New Record
      </Button>
      <Button secondary onClick={() => dispatch(casesActions.fetchCases())}>
        Load Existing Record
      </Button>
    </div>
  );
};

TracerLoadActions.propTypes = {};

export default TracerLoadActions;
