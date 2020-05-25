import React from 'react';

import PropTypes from 'prop-types';

import { modalWrapper, modalInner } from './styles.module.scss';

const Modal = ({ children }) => {
  return (
    <div className={modalWrapper}>
      <div className={modalInner}>{children}</div>
    </div>
  );
};

Modal.propTypes = {
  children: PropTypes.node,
};

export default Modal;
