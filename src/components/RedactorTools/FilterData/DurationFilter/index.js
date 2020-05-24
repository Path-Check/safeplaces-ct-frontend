import React, { useState, useEffect } from 'react';

import Slider from 'rc-slider';
import PropTypes from 'prop-types';
import Checkbox from 'components/Checkbox/Checkbox';

import { durationFilter } from './DurationFilter.module.scss';

const DurationFilter = () => {
  const times = [15, 30, 45, 60];
  const [checked, setChecked] = useState(false);
  const [duration, setDuration] = useState(times[0]);

  const handleChange = value => {
    setDuration(times[value - 1]);
  };

  useEffect(() => {
    if (checked) {
      // fire API call with duration
    }
  }, [checked]);

  return (
    <div className={durationFilter}>
      <Checkbox
        onChange={setChecked}
        label="Hide data less than duration"
        align="left"
      />
      <div>
        <Slider min={1} step={1} max={4} onChange={handleChange} />
        <span>{duration} Mins</span>
      </div>
    </div>
  );
};
DurationFilter.propTypes = {};

export default DurationFilter;
