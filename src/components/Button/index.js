import React from 'react';
import styles from './styles.module.scss';

const Button = ({
  text,
  width,
  height,
  disabled = false,
  onClick,
  children,
  icon,
}) => {
  return (
    <button
      className={styles.button}
      style={{ width, height }}
      disabled={disabled}
      type="button"
      onClick={onClick}
    >
      {children} {text}
    </button>
  );
};

export default Button;
