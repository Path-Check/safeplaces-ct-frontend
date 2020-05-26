import React from 'react';

import { dialog } from './Dialog.module.scss';

const Dialog = ({ children, ...rest }) => {
  return (
    <div style={{ ...rest }} className={dialog}>
      {children}
    </div>
  );
};

export default Dialog;
