import React, { useEffect, useState } from 'react';

import PropTypes from 'prop-types';

import classNames from 'classnames';
import { Transition } from 'react-transition-group';

import {
  modalWrapper,
  modalStyleB,
  modalNoAnimation,
  modalEntered,
  modalExiting,
  modalExited,
  modalInner,
  closeButton,
} from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import { useCloseOnEscape } from 'hooks/useCloseOnEscape';
import { createPortal } from 'react-dom';
import FocusTrap from 'focus-trap-react';

const Modal = ({ enter = 200, ...rest }) => {
  const modalRoot = document.getElementById('modal-root');

  return createPortal(
    <Transition
      in={true}
      appear
      timeout={{
        enter,
        exit: 0,
      }}
      unmountOnExit
    >
      {transition => <ModalUI animationState={transition} {...rest} />}
    </Transition>,
    modalRoot,
  );
};

const ModalUI = ({
  children,
  closeAction = () => null,
  animationState,
  showCloseAction = true,
  noAnimation,
  style,
}) => {
  useCloseOnEscape(() => closeAction && closeAction());

  const [focusTrapped, setFocusTrapped] = useState(false);

  useEffect(() => {
    setFocusTrapped(true);
  }, []);

  const classes = classNames({
    [`${modalWrapper}`]: true,
    [`${modalStyleB}`]: style === 'b',
    [`${modalNoAnimation}`]: noAnimation,
    [`${modalEntered}`]: animationState === 'entered',
    [`${modalExiting}`]: animationState === 'exiting',
    [`${modalExited}`]: animationState === 'exited',
  });

  return (
    <FocusTrap active={focusTrapped}>
      <div className={classes}>
        <button
          type="button"
          onClick={() => closeAction()}
          className={closeButton}
          style={{ opacity: showCloseAction ? '1' : '0' }}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <div id="modal" className={modalInner}>{children}</div>
      </div>
    </FocusTrap>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
