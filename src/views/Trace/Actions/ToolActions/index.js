import React from 'react';
import PropTypes from 'prop-types';

import { sidebarActions } from '../TracerActions.module.scss';
import Button from 'components/_shared/Button';
import { useSelector } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';

const TracerToolActions = () => {
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));

  return (
    <div className={sidebarActions}>
      <Button disabled={!activeCase?.points}>Stage for Publishing</Button>
      <Button secondary>Save Session</Button>
    </div>
  );
};

TracerToolActions.propTypes = {};

export default TracerToolActions;
