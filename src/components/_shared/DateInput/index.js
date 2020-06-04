import React, { useState } from 'react';
import moment from 'moment';

import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.module.scss';

import 'react-dates/initialize';
export default function DateInput({ handleChange, displayValue }) {
  const initialValue = moment(displayValue).toDate();

  const [startDate, setStartDate] = useState(initialValue);

  const handleDateChange = date => {
    const dateTime = moment(date).format();

    setStartDate(date);
    handleChange('date', dateTime);
  };

  return (
    <div className={styles.dateInput}>
      <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} />
      <DatePicker
        selected={startDate}
        showTimeSelect
        onChange={date => handleDateChange(date)}
        timeFormat="HH:mm"
        className="datePicker"
        dateFormat="MM/dd/yyyy  -  HH:mm"
      />
    </div>
  );
}
