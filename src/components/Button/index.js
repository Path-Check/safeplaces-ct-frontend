import React from 'react';
import styles from './styles.module.scss';

const Button = ({ text, width, height, disabled = false, onClick }) => {
  return (
    <button
      className={styles.button}
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
