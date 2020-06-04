import React, { useState } from 'react';
import moment from 'moment';

import { faCalendarAlt } from '@fortawesome/pro-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import styles from './styles.module.scss';

import 'react-dates/initialize';
import { useSelector } from 'react-redux';
import mapSelectors from 'ducks/map/selectors';

export default function DateInput({ handleChange, displayValue }) {
  const initialValue = displayValue ? moment(displayValue).toDate() : '';
  const selectedLocation = useSelector(state =>
    mapSelectors.getLocation(state),
  );

  const handleDateChange = date => {
    let dateTime = null;

    if (date) {
      dateTime = moment(date).format();
    }

    handleChange('date', dateTime);
  };

  return (
    <div className={styles.dateInput}>
      <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} />
      <DatePicker
        selected={
          selectedLocation?.time
            ? moment(selectedLocation.time).toDate()
            : initialValue
        }
        showTimeSelect
        onChange={date => handleDateChange(date)}
        timeFormat="HH:mm"
        className="datePicker"
        dateFormat="MM/dd/yyyy  -  HH:mm"
      />
    </div>
  );
}
