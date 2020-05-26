import React from 'react';
import PropTypes from 'prop-types';

import {
  toggleWrapper,
  toggle,
  toggleChecked,
  toggleWrapperLabel,
} from './SingleDateToggle.module.scss';

import classNames from 'classnames';

const SingleDateToggle = ({ onChange, isChecked }) => {
  const toggleClasses = classNames({
    [`${toggle}`]: true,
    [`${toggleChecked}`]: isChecked,
  });

  return (
    <div className={toggleWrapper}>
      <label className={toggleWrapperLabel}>Single Day</label>
      <label>
        <input
          type="checkbox"
          name="singleDayToggle"
          id="singleDayToggle"
          onChange={() => onChange(!isChecked)}
        />
        <label
          htmlFor="singleDayToggle"
          className={toggleClasses}
          role="presentation"
        />
      </label>
    </div>
  );
};

SingleDateToggle.propTypes = {
  onChange: PropTypes.func,
  isChecked: PropTypes.bool,
};

export default SingleDateToggle;
