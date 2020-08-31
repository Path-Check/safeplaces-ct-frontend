import React, { useState, useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import applicationSelectors from 'ducks/application/selectors';
import pointsSelectors from 'ducks/points/selectors';
import pointsActions from 'ducks/points/actions';

import { filtersContainer, clearFilters } from '../RedactorTools.module.scss';

import DurationFilter from 'components/_shared/RedactorTools/Filters/DurationFilter';
import RecordIdsFilter from 'components/_shared/RedactorTools/Filters/RecordIdsFilter';
import DateSelector from 'components/_shared/RedactorTools/Filters/DateSelector';
import FilterData from 'components/_shared/RedactorTools/Filters/FilterData';
import Tooltip from '../../Tooltip';

const durationTimes = [10, 15, 30, 45, 60];

const Filters = React.memo(({ filteredPointsLength, pointsLength }) => {
  const dispatch = useDispatch();
  const dates = useSelector(pointsSelectors.getPointsDates);
  const durationStore = useSelector(state =>
    pointsSelectors.getDuration(state),
  );
  const useDurationFilterStore = useSelector(
    pointsSelectors.getUseDurationFilter,
  );

  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  const [clearedFilters, setClearedFilters] = useState(false);
  const [filterRecordIds, setFilterRecordIds] = useState(false);
  const [selectAllRecords, setSelectAllRecords] = useState(true);
  const [duration, setDuration] = useState(durationStore || durationTimes[0]);
  const [useDurationFilter, setUseDurationFilter] = useState(
    useDurationFilterStore || false,
  );

  useEffect(() => {
    setUseDurationFilter(useDurationFilterStore);
  }, [useDurationFilterStore]);

  const applyDurationFilter = () => {
    setClearedFilters(false);
    dispatch(
      pointsActions.setFilters({
        duration,
        useDurationFilter: true,
      }),
    );
  };

  const applyRecordIdFilter = () => {
    setFilterRecordIds(true);
    setClearedFilters(false);
  };

  const removeRecordIdFilter = () => {
    setFilterRecordIds(false);
    setClearedFilters(false);
    dispatch(
      pointsActions.setFilters({
        recordIds: null,
      }),
    );
  };

  const removeDurationFilter = () => {
    dispatch(
      pointsActions.setFilters({
        duration: null,
        useDurationFilter: false,
      }),
    );
  };

  const clearAllFilters = () => {
    dispatch(pointsActions.clearFilters());
    setClearedFilters(false);
  };

  return (
    <>
      <div className={filtersContainer}>
        <DateSelector clearedFilters={clearedFilters} dates={dates} />
        <FilterData
          duration={duration}
          applyFilters={applyDurationFilter}
          closeAction={removeDurationFilter}
          useDurationFilter={useDurationFilter}
        >
          {pointsLength > 1 && (
            <>
              <DurationFilter
                duration={duration}
                setDuration={setDuration}
                times={durationTimes}
              />
            </>
          )}
        </FilterData>
        {isPublish && (
          <FilterData
            clearedFilters={clearedFilters}
            filterRecordIds={filterRecordIds}
            text="Record ID"
            closeAction={removeRecordIdFilter}
            applyFilters={applyRecordIdFilter}
            setSelectAllRecords={setSelectAllRecords}
            selectAllRecords={selectAllRecords}
          >
            <RecordIdsFilter
              setClearedFilters={setClearedFilters}
              filterRecordIds={filterRecordIds}
              selectAllRecords={selectAllRecords}
              setFilterRecordIds={setFilterRecordIds}
            />
          </FilterData>
        )}
      </div>
      
      <button
        onClick={clearAllFilters}
        className={clearFilters}
        disabled={pointsLength === filteredPointsLength}
      >
        REMOVE ALL FILTERS
      </button>
      <Tooltip
        text="Filter the data points by date range and duration."
        tooltip={2}
        top="5%"
      />
    </>
  );
});

export default Filters;
