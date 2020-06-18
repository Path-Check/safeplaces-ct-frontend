import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  redactorToolsHeader,
  selectedEditContextMenu,
  selectedEditContextMenuAction,
  selectedfaEllipsisVIcon,
} from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faEdit,
  faEllipsisV,
} from '@fortawesome/pro-solid-svg-icons';
import casesSelectors from 'ducks/cases/selectors';
import caseAction from 'ducks/cases/actions';
import EditRecordModal from './EditRecordModal';

const RedactorToolsHeader = () => {
  const dispatch = useDispatch();
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const externalId = useSelector(state => casesSelectors.getExternalId(state));
  const [showModal, setShowModal] = useState(false);
  const [showEditRecordButton, setEditRecordButton] = useState(false);
  const [externalInputValue, setInputValue] = useState('');

  const onChangeHandler = event => {
    setInputValue(event.target.value);
  };

  const onSubmit = async () => {
    if (activeCase) {
      dispatch(caseAction.updExternalCaseIdRequest(externalInputValue));
      setShowModal(false);
    }
  };

  if (!activeCase) {
    return null;
  }

  const _id = externalId || activeCase;

  const EditRecordButton = () => (
    <div className={selectedEditContextMenu}>
      <ul>
        <li>
          <button
            className={selectedEditContextMenuAction}
            type="button"
            onClick={() => {
              setShowModal(true);
              setEditRecordButton(false);
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
            Edit Record ID
          </button>
        </li>
      </ul>
    </div>
  );

  return (
    <>
      <header className={redactorToolsHeader}>
        <button
          type="button"
          onClick={() =>
            dispatch({
              type: 'RESET_VIEW',
            })
          }
          title="Back to home screen"
        >
          <FontAwesomeIcon icon={faChevronLeft} />
        </button>
        <h3>Record ID: {_id}</h3>
        <button
          className={selectedfaEllipsisVIcon}
          // onClick={() => setShowModal(true)}
          onClick={() => setEditRecordButton(true)}
          type="button"
        >
          <FontAwesomeIcon icon={faEllipsisV} />
        </button>
      </header>

      {showEditRecordButton && <EditRecordButton />}
      <EditRecordModal
        onSubmit={onSubmit}
        externalInputValue={externalInputValue}
        onChangeHandler={onChangeHandler}
        setShowModal={setShowModal}
        showModal={showModal}
      />
    </>
  );
};

RedactorToolsHeader.propTypes = {
  currentRecord: PropTypes.string,
};

export default RedactorToolsHeader;
