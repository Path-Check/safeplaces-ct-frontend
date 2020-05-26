import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';
import { useDispatch } from 'react-redux';

import recordActions from 'ducks/record/actions';

const TracerLoadActions = () => {
  const dispatch = useDispatch();

  const onAddClick = () => {
    dispatch(recordActions.addRecord());
  };

  const onLoadClick = () => {};

  return (
    <div className={sidebarActions}>
      <Button onClick={onAddClick}>Add New Record</Button>
      <Button secondary>Load Existing Record</Button>
    </div>
  );
};

TracerLoadActions.propTypes = {};

export default TracerLoadActions;
