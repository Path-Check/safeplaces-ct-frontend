import React, { useEffect } from 'react';

import PropTypes from 'prop-types';

import { modalWrapper, modalInner, closeButton } from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { useCloseOnEscape } from 'hooks/useCloseOnEscape';

const Modal = ({ children, closeAction = null, showCloseAction = true }) => {
  useCloseOnEscape(() => closeAction && closeAction());

  return (
    <div className={modalWrapper}>
      {closeAction && showCloseAction && (
        <button
          type="button"
          onClick={() => closeAction()}
          className={closeButton}
        >
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
