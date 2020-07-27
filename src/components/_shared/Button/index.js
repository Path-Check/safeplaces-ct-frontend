import React from 'react';
import {
  button,
  buttonLarge,
  buttonFullWidth,
  buttonSecondary,
  buttonTertiary,
  buttonWhite,
  buttonUnstyled,
} from './styles.module.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

const Button = ({
  id = '',
  width,
  height,
  disabled = false,
  onClick,
  large,
  secondary,
  tertiary,
  fullWidth,
  to,
  children,
  isWhite,
  className,
  unstyled,
  type = 'button',
}) => {
  const btnClasses = classNames(
    {
      [`${button}`]: true,
      [`${buttonLarge}`]: large,
      [`${buttonSecondary}`]: secondary,
      [`${buttonTertiary}`]: tertiary,
      [`${buttonFullWidth}`]: fullWidth,
      [`${buttonWhite}`]: isWhite,
      [`${buttonUnstyled}`]: unstyled,
    },
    [`${className}`],
  );

  return to ? (
    <Link id={id} className={btnClasses} to={to} style={{ width, height }}>
      {children}
    </Link>
  ) : (
    <button
      id={id}
      className={btnClasses}
      style={{ width, height }}
      disabled={disabled}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
