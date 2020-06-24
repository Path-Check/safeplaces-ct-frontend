import React, { useState, useRef } from 'react';
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
import applicationSelectors from 'ducks/application/selectors';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const RedactorToolsHeader = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const activeCases = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );
  const externalId = useSelector(state => casesSelectors.getExternalId(state));
  const mode = useSelector(state => applicationSelectors.getMode(state));
  const [showModal, setShowModal] = useState(false);
  const [showEditRecordButton, setEditRecordButton] = useState(false);
  const [externalInputValue, setInputValue] = useState('');

  useOnClickOutside(containerRef, () => setEditRecordButton(false));

  const onChangeHandler = event => {
    setInputValue(event.target.value);
  };

  const onSubmit = async () => {
    if (activeCases) {
      dispatch(caseAction.updExternalCaseIdRequest(externalInputValue));
      setShowModal(false);
    }
  };

  if (!activeCases) {
    return null;
  }

  const _id = activeCases.externalId || activeCases.caseId;

  const EditRecordButton = () => (
    <div className={selectedEditContextMenu}>
      <ul>
        <li>
          <button
            id="edit-record-id"
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
      <header className={redactorToolsHeader} ref={containerRef}>
        <button
          id="go-back"
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
        <h3 title={externalId || ''}>
          {Array.isArray(activeCases) ? (
            <>
              {activeCases.length} Record{activeCases.length > 1 ? 's' : ''}{' '}
              Loaded
            </>
          ) : (
            <>Record ID: {_id}</>
          )}
        </h3>
        {mode === 'trace' && (
          <button
            id="more-menu-button"
            className={selectedfaEllipsisVIcon}
            onClick={() => setEditRecordButton(true)}
            type="button"
          >
            <FontAwesomeIcon icon={faEllipsisV} />
          </button>
        )}
        {showEditRecordButton && <EditRecordButton />}
      </header>

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
