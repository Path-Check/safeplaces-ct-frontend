import React from 'react';
import PasswordStrengthIndicatorCondition from 'components/_shared/PasswordStrengthIndicator/_parts/ListItem';

import { passwordStrengthIndicator } from './PasswordStrengthIndicator.module.scss';

const items = [
  {
    text: 'At least 8 characters',
    pattern: new RegExp('(?=.{8,})'),
  },
  {
    text: 'One lowercase character',
    pattern: new RegExp('^(?=.*[a-z])'),
  },
  {
    text: 'One uppercase character',
    pattern: new RegExp('(?=.*[A-Z])'),
  },
  {
    text: 'One special character',
    pattern: new RegExp('(?=.*[!@#$%^&*])'),
  },
  {
    text: 'One number',
    pattern: new RegExp('(?=.*[0-9])'),
  },
];

const PasswordStrengthIndicator = ({ password }) => {
  return (
    <ul className={passwordStrengthIndicator}>
      {items.map(i => (
        <PasswordStrengthIndicatorCondition {...i} password={password} />
      ))}
    </ul>
  );
};

export default PasswordStrengthIndicator;
