import * as React from 'react';
import { useState } from 'react';
import {
  checkboxContainer,
  checkboxContainerDisabled,
  checkboxLabel,
  checkboxCustom,
  alignLeft,
  inputTitle,
} from './styles.module.scss';

import classNames from 'classnames';

const Checkbox = ({
  label,
  onChange,
  align,
  id,
  name,
  isChecked = false,
  disabled,
}) => {
  const [checked, setChecked] = useState(isChecked);

  const containerClasses = classNames({
    [`${checkboxContainer}`]: true,
    [`${checkboxContainerDisabled}`]: disabled,
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
          disabled={disabled}
        />
        <span className={checkboxCustom} />
      </label>
      <label className={inputTitle} tabIndex={0} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
