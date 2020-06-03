import React from 'react';

import PropTypes from 'prop-types';

import { modalWrapper, modalInner, closeButton } from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';

const Modal = ({ children, closeAction = null }) => {
  return (
    <div className={modalWrapper}>
      {closeAction && (
        <button onClick={closeAction} className={closeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
      <div className={modalInner}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
