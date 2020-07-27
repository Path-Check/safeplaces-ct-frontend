import React from 'react';
import {
  control,
  controlLabel,
  controlField,
  selectReplace,
} from './Select.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronDoubleDown,
  faChevronDown,
} from '@fortawesome/pro-solid-svg-icons';

const Select = ({
  label = '',
  name = '',
  id = name,
  placeholder = '',
  required = '',
  options,
}) => {
  const onChange = ({ target: { value, name } }) => {
    console.log(value, name);
  };

  return (
    <div className={control}>
      {label && (
        <div className={controlLabel}>
          <label htmlFor={name}>
            {label} {required && <span className="required">*</span>}
          </label>
        </div>
      )}
      <div className={controlField}>
        <span className={selectReplace}>
          <select
            className="input"
            placeholder={placeholder}
            id={id}
            name={name}
            required={required}
            onChange={onChange}
          >
            {options.map(({ value = '', label = '' }, i) => (
              <option key={`${name}-${i}-${value}`} value={value}>
                {label}
              </option>
            ))}
          </select>
          <FontAwesomeIcon icon={faChevronDown} />
        </span>
      </div>
    </div>
  );
};

export default Select;
