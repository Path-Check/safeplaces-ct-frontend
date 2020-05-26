import React from 'react';
import {
  button,
  buttonLarge,
  buttonSecondary,
  buttonFullWidth,
} from './styles.module.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Button = ({
  text,
  width,
  height,
  disabled = false,
  onClick,
  large,
  secondary,
  fullWidth,
  to,
  children,
  className,
}) => {
  const btnClasses = classNames(
    {
      [`${button}`]: true,
      [`${buttonLarge}`]: large,
      [`${buttonSecondary}`]: secondary,
      [`${buttonFullWidth}`]: fullWidth,
    },
    [`${className}`],
  );

  return to ? (
    <Link className={btnClasses} to={to} style={{ width, height }}>
      {children}
    </Link>
  ) : (
    <button
      className={btnClasses}
      style={{ width, height }}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
