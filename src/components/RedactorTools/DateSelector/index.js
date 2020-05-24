import React, { useState, useEffect } from 'react';
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
import { useHistory } from 'react-router';

const DateSelector = () => {
  const [isSingleDate, setIsSingleDate] = useState(false);
  const [dateRange, setDateRange] = useState([]);
  const [singleDate, setSingleRange] = useState('');

  useEffect(() => {}, [isSingleDate]);

  useEffect(() => {
    // Update the store with single date for filtering
  }, [singleDate]);

  useEffect(() => {
    // Update the store with date range for filtering
  }, [dateRange]);

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
              onChange={() => setIsSingleDate(!isSingleDate)}
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
        {isSingleDate ? (
          <Slider steps={5} />
        ) : (
          <Range min={0} allowCross={false} max={0} steps={0} />
        )}
      </div>
      <div className={dateSelectorSection}>
        {isSingleDate ? (
          <span>{singleDate}</span>
        ) : (
          <>
            <span>{dateRange[0]}</span>
            <span>{dateRange[1]}</span>
          </>
        )}
      </div>
    </div>
  );
};

DateSelector.propTypes = {};

export default DateSelector;
