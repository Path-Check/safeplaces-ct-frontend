import React, { useEffect, useCallback } from 'react';
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

import SingleDateToggle from 'components/_shared/RedactorTools/DateSelector/SingleDateToggle';
import { useDispatch, useSelector } from 'react-redux';
import pointsActions from '../../../../ducks/points/actions';
import pointsSelectors from '../../../../ducks/points/selectors';

const DateSelector = ({ dates }) => {
  const checkSingleDate = dates?.length === 1;
  const dispatch = useDispatch();
  const dateRange = useSelector(state => pointsSelectors.getDateRange(state));
  const singleDate = useSelector(state => pointsSelectors.getSingleDate(state));
  const isSingleDate = !!singleDate;

  useEffect(() => {
    if (checkSingleDate && !singleDate && !dateRange[0]) {
      dispatch(pointsActions.setSingleDate(dates[0]));
    }
  }, []); // eslint-disable-line

  const handleChange = useCallback(
    value => {
      if (isSingleDate) {
        dispatch(pointsActions.setSingleDate(dates[value]));
      } else {
        dispatch(
          pointsActions.setDateRange([dates[value[0]], dates[value[1]]]),
        );
      }
    },
    [dates, dispatch, isSingleDate],
  );

  const setSingleDate = value => {
    if (value) {
      dispatch(pointsActions.setSingleDate([dates[0]]));
    } else {
      dispatch(pointsActions.setDateRange([dates[0], dates[dates.length - 1]]));
    }
  };

  return (
    <div className={dateSelector}>
      <div className={dateSelectorSection}>
        <h5 className={dateSelectorTitle}>
          <FontAwesomeIcon icon={faCalendarDay} /> Date Selection
        </h5>
        <SingleDateToggle onChange={setSingleDate} isChecked={isSingleDate} />
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
