import * as React from 'react';
import {
  checkboxContainer,
  checkboxContainerDisabled,
  checkboxLabel,
  checkboxCustom,
  alignLeft,
  inputTitle,
  small,
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
  isSmall,
}) => {
  const containerClasses = classNames({
    [`${checkboxContainer}`]: true,
    [`${checkboxContainerDisabled}`]: disabled,
    [`${alignLeft}`]: align === 'left',
  });

  const labelClasses = classNames({
    [`${inputTitle}`]: true,
    [`${small}`]: isSmall,
  });

  const onCheck = e => {
    onChange(e);
  };

  return (
    <div className={containerClasses}>
      <label className={checkboxLabel} htmlFor={id}>
        <input
          type="checkbox"
          id={id}
          name={name}
          onChange={onCheck}
          checked={isChecked}
          className="input"
          disabled={disabled}
        />
        <span className={checkboxCustom} />
      </label>
      <label className={labelClasses} tabIndex={0} htmlFor={id}>
        {label}
      </label>
    </div>
  );
};

export default Checkbox;
