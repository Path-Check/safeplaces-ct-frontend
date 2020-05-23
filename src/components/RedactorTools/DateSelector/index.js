import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Slider, { Range } from 'rc-slider';

import {
  dateSelector,
  dateSelectorSection,
  toggleWrapper,
  toggle,
} from './dateSelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/pro-solid-svg-icons';

const DateSelector = () => {
  const [singleDay, setSingleDay] = useState(false);

  return (
    <div className={dateSelector}>
      <div className={dateSelectorSection}>
        <h5>
          <FontAwesomeIcon icon={faCalendarDay} /> Date Selection
        </h5>
        <div className={toggleWrapper}>
          <label>Single Day</label>
          <label>
            <input
              type="checkbox"
              name="singleDayToggle"
              id="singleDayToggle"
              onChange={() => setSingleDay(!singleDay)}
            />
            <label
              htmlFor="singleDayToggle"
              className={toggle}
              role="presentation"
            />
          </label>
        </div>
      </div>
      <div className={dateSelectorSection}>
        {singleDay ? (
          <Slider steps={5} />
        ) : (
          <Range min={0} allowCross={false} max={0} steps={0} />
        )}
      </div>
      <div className={dateSelectorSection}>
        <span>Sat, May 9, 2020</span>
        {!singleDay && <span>Sat, May 24, 2020</span>}
      </div>
    </div>
  );
};

DateSelector.propTypes = {};

export default DateSelector;
