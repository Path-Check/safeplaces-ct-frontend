import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Slider, { Range } from 'rc-slider';

import {
  dateSelector,
  dateSelectorSection,
  dateSelectorDates,
  dateSelectorTitle,
  sliderValue,
} from './dateSelector.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/pro-solid-svg-icons';

import SingleDateToggle from 'components/RedactorTools/DateSelector/SingleDateToggle';

const DateSelector = ({ dates }) => {
  const checkSingleDate = dates.length === 1;
  const [isSingleDate, setIsSingleDate] = useState(checkSingleDate);
  const [dateRange, setDateRange] = useState([
    dates[0],
    dates[dates.length - 1],
  ]);
  const [singleDate, setSingleDate] = useState(dates[0]);

  useEffect(() => {}, [isSingleDate]);

  useEffect(() => {
    // Update the store with single date for filtering
  }, [singleDate]);

  useEffect(() => {
    // Update the store with date range for filtering
  }, [dateRange]);

  if (!dates || dates.length < 1) {
    return null;
  }

  const handleChange = value => {
    if (isSingleDate) {
      console.log(dates[value]);
      setSingleDate(dates[value]);
    } else {
      setDateRange([dates[value[0]], dates[value[1]]]);
    }
  };

  if (!dates || dates.length < 1) {
    return null;
  }

  return (
    <div className={dateSelector}>
      <div className={dateSelectorSection}>
        <h5 className={dateSelectorTitle}>
          <FontAwesomeIcon icon={faCalendarDay} /> Date Selection
        </h5>
        <SingleDateToggle onChange={setIsSingleDate} isChecked={isSingleDate} />
      </div>
      <div>
        {isSingleDate ? (
          <Slider
            min={0}
            max={dates.length - 1}
            steps={dates.length}
            onChange={handleChange}
          />
        ) : (
          <Range
            min={0}
            max={dates.length - 1}
            steps={dates.length}
            allowCross={false}
            onChange={handleChange}
          />
        )}
      </div>
      <div className={dateSelectorDates}>
        {isSingleDate ? (
          <span className={sliderValue}>{singleDate}</span>
        ) : (
          <>
            <span className={sliderValue}>{dateRange[0]}</span>
            <span className={sliderValue}>{dateRange[1]}</span>
          </>
        )}
      </div>
    </div>
  );
};

DateSelector.propTypes = {
  dates: PropTypes.array.isRequired,
};

export default DateSelector;
