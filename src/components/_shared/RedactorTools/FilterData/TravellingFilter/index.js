import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import Checkbox from 'components/_shared/Checkbox/Checkbox';

const TravellingFilter = () => {
  const handleChange = value => {
    // trigger async call via store
  };

  return (
    <div>
      <Checkbox
        onChange={handleChange}
        label="Hide traveling data"
        id="travellingData"
        align="left"
      />
    </div>
  );
};

TravellingFilter.propTypes = {};

export default TravellingFilter;
