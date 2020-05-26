import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';
import { useSelector } from 'react-redux';
import recordsSelectors from 'ducks/record/selectors';

const TracerToolActions = () => {
  const record = useSelector(state => recordsSelectors.getRecord(state));

  return (
    <div className={sidebarActions}>
      <Button disabled={!record?.points}>Stage for Publishing</Button>
      <Button secondary>Save Session</Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
