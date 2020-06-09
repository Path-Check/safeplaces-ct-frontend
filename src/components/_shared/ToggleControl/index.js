import React from 'react';
import PropTypes from 'prop-types';

import {
  toggleWrapper,
  toggle,
  toggleChecked,
  toggleWrapperLabel,
} from './Toggle.module.scss';

import classNames from 'classnames';

const Toggle = ({ onChange, isChecked, label, name, id }) => {
  const toggleClasses = classNames({
    [`${toggle}`]: true,
    [`${toggleChecked}`]: isChecked,
  });

  return (
    <div className={toggleWrapper}>
      <label className={toggleWrapperLabel}>{label}</label>
      <label>
        <input
          type="checkbox"
          name={name}
          id={id}
          onChange={() => onChange(!isChecked)}
        />
        <label htmlFor={id} className={toggleClasses} role="presentation" />
      </label>
    </div>
  );
};

Toggle.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
  label: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
};

export default Toggle;
