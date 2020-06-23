import React, { useState, useRef } from 'react';
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
  filterBodyMain,
  filterBodyActions,
} from './FilterData.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Button from 'components/_shared/Button';
import { useOnClickOutside } from 'hooks/useOnClickOutside';

const FilterData = ({ children, applyFilters }) => {
  const containerRef = useRef();
  const [filtersVisible, setFiltersVisible] = useState(false);

  useOnClickOutside(containerRef, () => setFiltersVisible(false));

  return (
    <div className={filterData} ref={containerRef}>
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
      >
        <div className={filterBodyMain}>{children}</div>
        <div className={filterBodyActions}>
          <Button
            small
            onClick={() => {
              applyFilters();
              setFiltersVisible(false);
            }}
          >
            Apply
          </Button>
        </div>
      </div>
    </div>
  );
};

FilterData.propTypes = {};

export default FilterData;
