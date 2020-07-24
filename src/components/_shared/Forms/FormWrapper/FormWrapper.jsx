import React from 'react';

import {
  form,
  formContainer,
  formWrapper,
  formTitle,
  formIntro,
} from './FormWrapper.module.scss';

import Logo from 'components/_global/Logo';

const FormWrapper = ({ title, intro, children }) => {
  return (
    <div className={form}>
      <Logo />
      <div className={formContainer}>
        <div className={formWrapper}>
          {title && <h3 className={formTitle}>{title}</h3>}
          {intro && <p className={formIntro}>{intro}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};

export default FormWrapper;
