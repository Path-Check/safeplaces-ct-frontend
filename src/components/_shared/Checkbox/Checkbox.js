import * as React from 'react';
import { useState } from 'react';
import {
  checkboxContainer,
  checkboxLabel,
  checkboxCustom,
  alignLeft,
  inputTitle,
} from './styles.module.scss';

import classNames from 'classnames';

const Checkbox = ({ label, onChange, align, id, name }) => {
  const [checked, setChecked] = useState(false);

  const containerClasses = classNames({
    [`${checkboxContainer}`]: true,
    [`${alignLeft}`]: align === 'left',
  });

  const onCheck = e => {
    setChecked(!checked);
    onChange(!checked, e);
  };

  return (
    <div className={containerClasses}>
      <label className={checkboxLabel} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          onChange={onCheck}
          checked={checked}
          className="input"
        />
        <span className={checkboxCustom} />
      </label>
      <span
        className={inputTitle}
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
