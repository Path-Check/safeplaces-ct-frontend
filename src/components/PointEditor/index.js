import React from 'react';
import PropTypes from 'prop-types';

import Button from 'components/Button';

const PointEditor = ({ location, date, time, duration, type = 'add' }) => {
  return (
    <div>
      <h5>{type === 'add' ? 'Add Data to Record' : 'Edit Data'}</h5>
      <div>
        <div>Places control</div>
        <span>or</span>
        <div>Select from Map</div>
      </div>
      <div>Date control</div>
      <div>
        <div>time control</div>
        <div>duration control</div>
      </div>
      <Button
        onClick={() => console.log('submit form')}
        type="submit"
        text="Save Data"
      />
    </div>
  );
};

PointEditor.propTypes = {
  location: PropTypes.string,
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.string,
};

export default PointEditor;
