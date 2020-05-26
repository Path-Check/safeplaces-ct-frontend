import React from 'react';
import PropTypes from 'prop-types';

import { redactorToolsHeader } from './header.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft } from '@fortawesome/pro-solid-svg-icons';

const RedactorToolsHeader = ({ currentRecord }) => {
  const handleBack = () => console.log('go back');

  return (
    <header className={redactorToolsHeader}>
      <button type="button" onClick={handleBack} title="Back to home screen">
        <FontAwesomeIcon icon={faChevronLeft} />
      </button>
      <h3>Record ID: {currentRecord}</h3>
    </header>
  );
};

RedactorToolsHeader.propTypes = {
  currentRecord: PropTypes.string,
};

export default RedactorToolsHeader;
