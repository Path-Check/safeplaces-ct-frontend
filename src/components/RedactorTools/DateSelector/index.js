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

import SingleDateToggle from 'components/RedactorTools/DateSelector/SingleDateToggle';

const DateSelector = ({ steps, minDate, maxDate }) => {
  const [isSingleDate, setIsSingleDate] = useState(false);
  const [dateRange, setDateRange] = useState([minDate, maxDate]);
  const [singleDate, setSingleDate] = useState(minDate);

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
        <SingleDateToggle onChange={setIsSingleDate} isChecked={isSingleDate} />
      </div>
      <div className={dateSelectorSection}>
        {isSingleDate ? (
          <Slider
            min={minDate}
            max={maxDate}
            steps={steps}
            onChange={value => setSingleDate(value)}
          />
        ) : (
          <Range
            min={minDate}
            max={maxDate}
            steps={steps}
            allowCross={false}
            onChange={value => setDateRange(value)}
          />
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
