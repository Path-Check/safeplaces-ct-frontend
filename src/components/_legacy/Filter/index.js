import React, { useEffect } from 'react';
import Slider, { Range } from 'rc-slider';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import { getTrackStart, getTrackEnd, getFilter } from '../../selectors';
import styles from './styles.module.scss';
import { Checkbox } from '@wfp/ui';
import filter from '../../ducks/filter';
console.log('filter', filter);
const Handle = Slider.Handle;

const handle = props => {
  const { value, dragging, index, ...restProps } = props;
  return (
    <Handle value={value} {...restProps}>
      <div className={styles.handleText}>
        {moment.utc(value).format('MM-DD HH:mm')}
      </div>
    </Handle>
  );
};

export default function Filter() {
  const currentFilter = useSelector(getFilter);
  const trackStart = useSelector(getTrackStart);
  const trackEnd = useSelector(getTrackEnd);
  const dispatch = useDispatch();
  const steps = 30;
  useEffect(() => {
    dispatch(filter.actions.updateFilterDates([trackStart, trackEnd]));
  }, [trackStart, trackEnd, dispatch]);

  const handleChange = value => {
    dispatch(
      filter.actions.updateFilterDates({ start: value[0], end: value[1] }),
    );
  };

  return (
    <div>
      {/* <div className={styles.sliderDescription}>
        {moment
          .utc(filter ? filter.dates[0] : trackStart)
          .format("YYYY-MM-DD HH:mm")}{" "}
        -{" "}
        {moment
          .utc(filter ? filter.dates[1] : trackEnd)
          .format("YYYY-MM-DD HH:mm")}
        </div> */}

      <div className={styles.rangeWrapper}>
        <div>
          <Range
            min={trackStart}
            max={trackEnd}
            steps={steps}
            value={currentFilter && Object.values(currentFilter.dates)}
            handle={handle}
            onChange={handleChange}
          />
        </div>
      </div>
      <div className={styles.showFilter}>
        <Checkbox name="<15-min" labelText="<15 min" />
        <Checkbox name="<30-min" labelText="<30 min" />
        <Checkbox name="<60-min" labelText="<1 hour" />
        <Checkbox name="travel" labelText="travel" />
      </div>
      <div></div>
    </div>
  );
}
