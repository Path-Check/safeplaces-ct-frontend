import React, { useState, useEffect, useCallback } from 'react';
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
import moment from 'moment';

const DateSelector = ({ dates }) => {
  const checkSingleDate = dates?.length === 1;
  // const [isSingleDate, setIsSingleDate] = useState(checkSingleDate);
  // const [dateRange, setDateRange] = useState([]);
  // const [singleDate, setSingleDate] = useState();
  const dispatch = useDispatch();
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const dateRange = useSelector(state => pointsSelectors.getDateRange(state));
  const singleDate = useSelector(state => pointsSelectors.getSingleDate(state));
  const isSingleDate = !!singleDate;
  const currentDateFormat = 'ddd, MMMM D, YYYY';

  // const filterSingleDatePoints = useCallback(() => {
  //   return points.filter(p =>
  //     moment(moment(p.time).format(currentDateFormat)).isSame(
  //       moment(singleDate, 'ddd, MMMM D, YYYY'),
  //     ),
  //   );
  // }, [points]);

  // const filterRangeDatePoints = useCallback(() => {
  //   return points.filter(p =>
  //     moment(moment(p.time).format(currentDateFormat)).isBetween(
  //       moment(dateRange[0], 'ddd, MMMM D, YYYY'),
  //       moment(dateRange[1], 'ddd, MMMM D, YYYY'),
  //       undefined,
  //       '[]',
  //     ),
  //   );
  // }, [dateRange, points]);

  // useEffect(() => {
  //   if (!isSingleDate) {
  //     dispatch(pointsActions.setFilteredPoints([]));
  //   }
  // }, [dispatch, isSingleDate]);

  // useEffect(() => {
  //   if (singleDate) {
  //     const filtered = filterSingleDatePoints();
  //     dispatch(pointsActions.setFilteredPoints(filtered));
  //   }
  // }, [dispatch, filterSingleDatePoints, singleDate]);

  // useEffect(() => {
  //   if (dateRange.length) {
  //     const filtered = filterRangeDatePoints();
  //     dispatch(pointsActions.setFilteredPoints(filtered));
  //   }
  // }, [dateRange, dispatch, filterRangeDatePoints]);

  // const handleChange = useCallback(
  //   value => {
  //     if (isSingleDate) {
  //       setSingleDate(dates[value]);
  //     } else {
  //       setDateRange([dates[value[0]], dates[value[1]]]);
  //       dispatch(
  //         pointsActions.setDateRange([dates[value[0]], dates[value[1]]]),
  //       );
  //     }
  //   },
  //   [dates, dispatch, isSingleDate],
  // );

  useEffect(() => {
    console.log('reload');
  });

  // useEffect(() => {
  //   if (checkSingleDate) {
  //     dispatch(pointsActions.setSingleDate(dates[0]));
  //   }
  // }, [checkSingleDate, dates, dispatch]);

  const handleChange = useCallback(
    value => {
      console.log('handleChange');
      if (isSingleDate) {
        console.log('isSingleDate');
        // setSingleDate(dates[value]);
        dispatch(pointsActions.setSingleDate(dates[value]));
      } else {
        // setDateRange([dates[value[0]], dates[value[1]]]);
        dispatch(
          pointsActions.setDateRange([dates[value[0]], dates[value[1]]]),
        );
      }
    },
    [dates, dispatch, isSingleDate],
  );

  const setSingleDate = value => {
    console.log(`setSingleDate ${value}`);
    if (value) {
      dispatch(pointsActions.setSingleDate([dates[0]]));
    } else {
      dispatch(pointsActions.setDateRange([dates[0], dates[dates.length - 1]]));
    }
    // console.log(value);
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
