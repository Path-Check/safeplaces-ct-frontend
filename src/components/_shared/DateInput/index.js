import React, { useState, useEffect } from 'react';
import moment from 'moment';

import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.module.scss';

import 'react-dates/initialize';

function DateInput({
  handleChange,
  displayValue,
  selectedValue,
  type,
  id,
  label,
  name,
  minDate,
  maxDate,
  minTime,
  maxTime,
  placeholder,
}) {
  const initialValue = displayValue ? moment(displayValue).toDate() : '';

  const handleDateChange = date => {
    let time = null;

    if (date) {
      time = moment(date).format();
    }

    handleChange({ time });
  };

  return (
    <div className={styles.dateInputWrapper}>
      {label && <label htmlFor={id}>{label}</label>}
      <div className={styles.dateInput}>
        <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} />
        <DatePicker
          selected={
            selectedValue ? moment(selectedValue).toDate() : initialValue
          }
          showTimeSelect
          onChange={date => handleDateChange(date)}
          timeFormat="h:mma"
          timeIntervals={5}
          className="datePicker"
          dateFormat="MM/dd/yyyy  -  h:mma"
          minTime={minTime}
          maxTime={maxTime}
          minDate={minDate}
          maxDate={maxDate}
          placeholderText={placeholder}
          required
          id={id}
          name={name}
        />
      </div>
    </div>
  );
}

export default DateInput;
