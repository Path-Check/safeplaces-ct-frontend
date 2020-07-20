import React from 'react';

import { faPencilAlt, faTrash } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { selectedDataMenuActions } from '../SelectedDataItem.module.scss';

import pointsActions from 'ducks/points/actions';
import { useDispatch } from 'react-redux';

import applicationActions from 'ducks/application/actions';

const SelectedDataItemActions = React.memo(({ id, discreetPointIds }) => {
  const dispatch = useDispatch();

  console.log(id);

  return (
    <ul className={selectedDataMenuActions}>
      <li>
        <button
          type="button"
          onClick={() =>
            dispatch(applicationActions.updateStatus('EDIT POINT'))
          }
          title="Edit Item"
        >
          <FontAwesomeIcon icon={faPencilAlt} />
        </button>
      </li>
      <li>
        <button
          type="button"
          title="Delete Item"
          onClick={() =>
            dispatch(pointsActions.deletePoint({ id, discreetPointIds }))
          }
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </li>
    </ul>
  );
});

export default SelectedDataItemActions;
