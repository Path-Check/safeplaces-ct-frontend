import React, { useEffect, useState } from 'react';
import Slider from 'rc-slider';
import styles from './styles.module.scss';

const DaySlider = ({ id, handleChange, value }) => {
  const [day, setDay] = useState(value || 14);

  const onChange = d => {
    setDay(d);
  };

  useEffect(() => {
    handleChange({ target: { value: day, id } });
  }, [day]);

  return (
    <div className={styles.container} id="day-slider">
      <Slider
        ariaLabelForHandle={day}
        min={0}
        max={30}
        value={day}
        onChange={onChange}
        handleStyle={{
          borderColor: '#6979F8',
          backgroundColor: '#6979F8',
          boxShadow: 'none',
          width: 24,
          height: 24,
          marginTop: '-10px',
          marginLeft: 10,
        }}
      />
      <span className={styles.text}>
        {`${day} ${day !== 1 ? 'days' : 'day'}`}
      </span>
    </div>
  );
};

export default DaySlider;
