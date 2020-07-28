import React, { useEffect, useState } from 'react';

import { faCircle, faCheckCircle } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import classNames from 'classnames';

import {
  passwordStrengthIndicatorItem,
  passwordStrengthIndicatorItemValid,
} from '../PasswordStrengthIndicator.module.scss';

const PasswordStrengthIndicatorCondition = ({ pattern, text, password }) => {
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    setIsValid(pattern.test(password));
  }, [password]);

  const classes = classNames({
    [`${passwordStrengthIndicatorItem}`]: true,
    [`${passwordStrengthIndicatorItemValid}`]: isValid,
  });

  return (
    <li className={classes}>
      <FontAwesomeIcon
        icon={isValid ? faCheckCircle : faCircle}
        color="currentColor"
      />{' '}
      {text}
    </li>
  );
};

export default PasswordStrengthIndicatorCondition;
