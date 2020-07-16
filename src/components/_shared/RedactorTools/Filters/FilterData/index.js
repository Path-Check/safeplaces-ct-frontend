import React, { useRef, useState } from 'react';

import {
  filterBody,
  filterBodyActions,
  filterBodyActive,
  filterBodyMain,
  filterData,
} from './FilterData.module.scss';
import Button from 'components/_shared/Button';
import { useOnClickOutside } from 'hooks/useOnClickOutside';
import DateButton from '../DateSelector/DateButton';

const FilterData = ({
  filterRecordIds,
  text,
  children,
  applyFilters,
  duration,
  closeAction,
  useDurationFilter,
}) => {
  const containerRef = useRef();
  const [filtersVisible, setFiltersVisible] = useState(false);

  useOnClickOutside(containerRef, () => setFiltersVisible(false));
  return (
    <div className={filterData} ref={containerRef}>
      <DateButton
        onClick={() => setFiltersVisible(!filtersVisible)}
        closeAction={closeAction}
        removeFilter={useDurationFilter || filterRecordIds}
        text={
          text ||
          (useDurationFilter ? `More than ${duration} min` : 'Any duration')
        }
      />
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
              setFiltersVisible(false);
              applyFilters();
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
