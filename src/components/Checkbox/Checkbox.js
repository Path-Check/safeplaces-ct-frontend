import * as React from 'react';
import { useState } from 'react';
import styles from './styles.module.scss';

const Checkbox = ({ label, onChange }) => {
  const [checked, setChecked] = useState(false);

  const onCheck = () => {
    setChecked(!checked);
    onChange(!checked);
  };

  return (
    <div className={styles.checkboxContainer}>
      <label className={styles.checkboxLabel} htmlFor="remember-me">
        <input
          type="checkbox"
          id="remember-me"
          onChange={onCheck}
          checked={checked}
          className="input"
        />
        <span className={styles.checkboxCustom} />
      </label>
      <span
        className={styles.inputTitle}
        onClick={onCheck}
        onKeyPress={onCheck}
        role="button"
        tabIndex={0}
      >
        {label}
      </span>
    </div>
  );
};

export default Checkbox;
