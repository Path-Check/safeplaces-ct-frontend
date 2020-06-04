import React, { useState } from 'react';

import {
  selectionLocationHelp,
  selectionLocationHelpBody,
  selectionLocationHelpToggle,
} from './SelectionLocationHelp.module.scss';
import {
  faChevronLeft,
  faChevronDown,
  faChevronUp,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { useDispatch, useSelector } from 'react-redux';
import applicationActions from 'ducks/application/actions';
import applicationSelectors from 'ducks/application/selectors';

const SelectionLocationHelp = () => {
  const dispatch = useDispatch();
  const [showBody, setShowBody] = useState(true);
  const toggleIcon = showBody ? faChevronUp : faChevronDown;
  const isEdit =
    useSelector(state => applicationSelectors.getStatus(state)) ===
    'EDIT POINT';

  console.log(isEdit);

  return (
    <div className={selectionLocationHelp}>
      <button
        onClick={() => setShowBody(!showBody)}
        className={selectionLocationHelpToggle}
      >
        <FontAwesomeIcon icon={toggleIcon} />
      </button>
      <h5>
        <button
          onClick={() => {
            isEdit
              ? dispatch(applicationActions.updateStatus('EDIT POINT'))
              : dispatch(applicationActions.updateStatus('ADD POINT'));
          }}
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        Select Location on Map
      </h5>
      {showBody && (
        <div className={selectionLocationHelpBody}>
          <ol>
            <li>Drag and zoom the map to view the location you need to add </li>
            <li>Right click at that location and select “Use Location”</li>
          </ol>
        </div>
      )}
    </div>
  );
};

export default SelectionLocationHelp;
