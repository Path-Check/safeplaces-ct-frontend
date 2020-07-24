import React from 'react';

import {
  form,
  formContainer,
  formWrapper,
  formTitle,
} from './FormWrapper.module.scss';

import Logo from 'components/_global/Logo';

const FormWrapper = ({ title, children }) => {
  return (
    <div className={form}>
      <Logo />
      <div className={formContainer}>
        <div className={formWrapper}>
          {title && <div className={formTitle}>{title}</div>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
