import React from 'react';
import { button, buttonLarge, buttonSecondary } from './styles.module.scss';

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
  to,
}) => {
  const btnClasses = classNames({
    [`${button}`]: true,
    [`${buttonLarge}`]: large,
    [`${buttonSecondary}`]: secondary,
  });

  return to ? (
    <Link className={btnClasses} to={to} style={{ width, height }}>
      Create Record Manually
    </Link>
  ) : (
    <button
      className={btnClasses}
      style={{ width, height }}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
