import React from 'react';
import {
  button,
  buttonLarge,
  buttonFullWidth,
  buttonSecondary,
  buttonTertiary,
  buttonLoading,
  buttonWhite,
  buttonUnstyled,
} from './styles.module.scss';

import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { faSpinner } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

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
  type = 'button',
  loading = false,
  unstyled,
}) => {
  const btnClasses = classNames(
    {
      [`${button}`]: true,
      [`${buttonLarge}`]: large,
      [`${buttonSecondary}`]: secondary,
      [`${buttonTertiary}`]: tertiary,
      [`${buttonFullWidth}`]: fullWidth,
      [`${buttonWhite}`]: isWhite,
      [`${buttonLoading}`]: loading,
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
      disabled={disabled || loading}
      type={type}
      onClick={onClick}
    >
      {loading ? (
        <>
          Loading <FontAwesomeIcon icon={faSpinner} />
        </>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
