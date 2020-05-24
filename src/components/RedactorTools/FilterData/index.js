import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  faCaretUp,
  faCaretDown,
  faFilter,
} from '@fortawesome/pro-solid-svg-icons';

import {
  filterData,
  filterDataHeader,
  filterBody,
  filterBodyActive,
  filterBodyAction,
} from './FilterData.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const FilterData = () => {
  const [filtersVisible, setFiltersVisible] = useState(false);

  return (
    <div className={filterData}>
      <div className={filterDataHeader}>
        <h5>
          <FontAwesomeIcon icon={faFilter} /> Filter Data
        </h5>
        <button
          className={filterBodyAction}
          onClick={() => setFiltersVisible(!filtersVisible)}
        >
          {!filtersVisible ? 'Show' : 'Hide'} Filters
          <FontAwesomeIcon icon={!filtersVisible ? faCaretDown : faCaretUp} />
        </button>
      </div>
      <div
        className={
          filtersVisible ? `${filterBody} ${filterBodyActive}` : filterBody
        }
      ></div>
    </div>
  );
};

FilterData.propTypes = {};

export default FilterData;
