import React from 'react';
import PropTypes from 'prop-types';

import { redactorToolsHeader } from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';
import casesSelectors from 'ducks/cases/selectors';
import { useSelector } from 'react-redux';

const RedactorToolsHeader = ({ currentRecord }) => {
  const activeCase = useSelector(state => casesSelectors.getActiveCase(state));
  const handleBack = () => console.log('go back');

  if (!activeCase) {
    return null;
  }

  return (
    <header className={redactorToolsHeader}>
      <button type="button" onClick={handleBack} title="Back to home screen">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h3>Record ID: {activeCase.caseId}</h3>
    </header>
  );
};

RedactorToolsHeader.propTypes = {
  currentRecord: PropTypes.string,
};

export default RedactorToolsHeader;
