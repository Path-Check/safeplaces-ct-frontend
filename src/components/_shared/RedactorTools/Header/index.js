import React, { useRef, useState } from 'react';
import PropTypes from 'prop-types';

import { useDispatch, useSelector } from 'react-redux';
import {
  headerTitle,
  redactorToolsHeader,
  selectedEditAction,
} from './header.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faPencilAlt } from '@fortawesome/pro-solid-svg-icons';
import casesSelectors from 'ducks/cases/selectors';
import caseAction from 'ducks/cases/actions';
import EditRecordModal from './EditRecordModal';
import applicationSelectors from 'ducks/application/selectors';
import Tooltip from '../../Tooltip';

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
      <div className={redactorToolsHeader} ref={containerRef}>
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
        <h3 className={headerTitle} title={externalId || ''}>
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
      </div>

      <EditRecordModal
        onSubmit={onSubmit}
        externalInputValue={externalInputValue}
        onChangeHandler={onChangeHandler}
        setShowModal={setShowModal}
        showModal={showModal}
      />

      <Tooltip
        text="If you are using a system to manage your patients and already have
              an ID for this patient, you can change it here."
        tooltip={1}
      />
    </>
  );
};

RedactorToolsHeader.propTypes = {
  currentRecord: PropTypes.string,
};

export default RedactorToolsHeader;
