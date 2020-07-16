import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { wrapper } from './dateSelector.module.scss';
import { useDispatch } from 'react-redux';

import DateButton from './DateButton';
import moment from 'moment';
import DatePicker from 'react-datepicker';
import pointsActions from 'ducks/points/actions';

const DateSelector = ({ dates, clearedFilters }) => {
  const dispatch = useDispatch();

  const [startDate, setStartDate] = useState(moment(dates[0]).toDate());
  const [endDate, setEndDate] = useState(
    moment(dates[dates.length - 1]).toDate(),
  );

  useEffect(() => {
    if (clearedFilters) {
      setStartDate(moment(dates[0]).toDate());
      setEndDate(moment(dates[dates.length - 1]).toDate());
      dispatch(pointsActions.setDateRange([dates[0], dates[dates.length - 1]]));
    }
  }, [clearedFilters]);

  const CustomInput = ({ onClick }) => {
    return <DateButton onClick={onClick} date1={startDate} date2={endDate} />;
  };

  const handleDateChange = date => {
    if (!startDate && !endDate) {
      setStartDate(date);
    } else if (startDate && !endDate) {
      if (date < startDate) {
        setStartDate(date);
      } else {
        setEndDate(date);
        dispatch(pointsActions.setDateRange([startDate, date]));
      }
    }

    if (startDate && endDate) {
      setStartDate(date);
      setEndDate(null);
    }
  };

  const handleSelect = date => {
    if (startDate && !endDate) {
      handleDateChange(date);
    }
  };

  return (
    <div className={wrapper}>
      <DatePicker
        onSelect={handleSelect}
        selected={startDate}
        minDate={moment().subtract('30', 'd').toDate()}
        maxDate={moment().add('30', 'd').toDate()}
        monthsShown={2}
        shouldCloseOnSelect={false}
        startDate={startDate}
        endDate={endDate}
        onChange={handleDateChange}
        dateFormat="MM/dd/yyyy"
        required
        customInput={<CustomInput />}
        selectsStart
      />
    </div>
  );
};

DateSelector.propTypes = {
  dates: PropTypes.array.isRequired,
};

export default DateSelector;
