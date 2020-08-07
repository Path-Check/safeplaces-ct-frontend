import React from 'react';

import casesActions from 'ducks/cases/actions';
import { useDispatch } from 'react-redux';

import { sidebarActions } from 'views/ViewWrapper.module.scss';
import Button from 'components/_shared/Button';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

const TracerLoadActions = () => {
  const dispatch = useDispatch();

  return (
    <div className={sidebarActions}>
      <Button
        id="add-new-record"
        onClick={() => dispatch(casesActions.fetchCase())}
      >
        <FontAwesomeIcon icon={faPlus} /> Add New Record
      </Button>
      <Button
        id="load-existing-record"
        secondary
        onClick={() => dispatch(casesActions.fetchCases())}
      >
        Load Existing Record
      </Button>
    </div>
  );
};

TracerLoadActions.propTypes = {};

export default TracerLoadActions;
