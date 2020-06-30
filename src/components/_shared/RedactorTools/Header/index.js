import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import { redactorToolsHeader, selectedEditAction } from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPencilAlt } from '@fortawesome/pro-solid-svg-icons';
import casesSelectors from 'ducks/cases/selectors';
import caseAction from 'ducks/cases/actions';
import EditRecordModal from './EditRecordModal';
import applicationSelectors from 'ducks/application/selectors';

const RedactorToolsHeader = () => {
  const dispatch = useDispatch();
  const containerRef = useRef();
  const activeCases = useSelector(state =>
    casesSelectors.getActiveCases(state),
  );
  const externalId = useSelector(state => casesSelectors.getExternalId(state));
  const mode = useSelector(state => applicationSelectors.getMode(state));
  const [showModal, setShowModal] = useState(false);
  const [externalInputValue, setInputValue] = useState('');

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
            id="edit-record-id"
            className={selectedEditAction}
            type="button"
            onClick={() => {
              setShowModal(true);
            }}
            title="Edit Record ID"
          >
            <FontAwesomeIcon icon={faPencilAlt} />
          </button>
        )}
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
