import React from 'react';

import Slider from 'rc-slider';

import {
  durationText,
  durationFilter,
  durationTitle,
  durationFilterSliderActive,
} from './DurationFilter.module.scss';

const DurationFilter = ({ duration, setDuration, times }) => {
  const handleChange = value => {
    setDuration(times[value]);
  };

  return (
    <div className={durationFilter}>
      <h3 className={durationTitle}>Duration</h3>
      <div className={durationFilterSliderActive}>
        <div className={durationText}>{duration} mins.</div>
        <Slider
          min={0}
          max={times.length - 1}
          step={1}
          onChange={handleChange}
        />
      </div>
    </div>
  );
};

DurationFilter.propTypes = {};

export default DurationFilter;
