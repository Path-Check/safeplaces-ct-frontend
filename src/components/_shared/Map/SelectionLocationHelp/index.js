import React, { useState } from 'react';

import {
  selectionLocationHelp,
  selectionLocationHelpClose,
} from './SelectionLocationHelp.module.scss';
import { faInfoCircle, faTimes } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import applicationActions from 'ducks/application/actions';
import mapActions from 'ducks/map/actions';

const SelectionLocationHelp = () => {
  const dispatch = useDispatch();
  const [showBody, setShowBody] = useState(true);

  return (
    <div className={selectionLocationHelp}>
      <button
        onClick={() => {
          dispatch(applicationActions.updateStatus('EDIT POINT'));
        }}
        className={selectionLocationHelpClose}
      >
        <FontAwesomeIcon icon={faTimes} />
      </button>
      <h5>
        <FontAwesomeIcon icon={faInfoCircle} />
        Select Location on Map
      </h5>
      {showBody && (
        <ol>
          <li>Drag and zoom the map to view the location you need to add </li>
          <li>Right click at that location and select “Use Location”</li>
        </ol>
      )}
    </div>
  );
};

export default SelectionLocationHelp;
