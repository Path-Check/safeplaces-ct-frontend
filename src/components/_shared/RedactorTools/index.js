import React, { useState, useEffect } from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';
import FilterData from 'components/_shared/RedactorTools/FilterData';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';
import RecordIdsFilter from 'components/_shared/RedactorTools/FilterData/RecordIdsFilter';
import SelectedDataList from 'components/_shared/SelectedData';
import { useDispatch, useSelector } from 'react-redux';
import pointsSelectors from '../../../ducks/points/selectors';
import pointsActions from 'ducks/points/actions';
import applicationSelectors from 'ducks/application/selectors';
import PointsInfo from 'components/_shared/RedactorTools/PointsInfo';

import {
  redactorTools,
  filtersContainer,
  clearFilters,
} from './RedactorTools.module.scss';

const durationTimes = [10, 15, 30, 45, 60];

const RedactorTools = () => {
  const dispatch = useDispatch();
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const dates = useSelector(state => pointsSelectors.getPointsDates(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const durationStore = useSelector(state =>
    pointsSelectors.getDuration(state),
  );
  const useDurationFilterStore = useSelector(state =>
    pointsSelectors.getUseDurationFilter(state),
  );
  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  const [clearedFilters, setClearedFilters] = useState(false);
  const [filterRecordIds, setFilterRecordIds] = useState(false);
  const [duration, setDuration] = useState(durationStore || durationTimes[0]);
  const [useDurationFilter, setUseDurationFilter] = useState(
    useDurationFilterStore || false,
  );
  const hiddenPoints = points.filter(({ hidden }) => hidden);

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
    setClearedFilters(true);
  };

  return (
    <>
      <header className={redactorTools}>
        <RedactorToolsHeader />
        {points?.length > 1 && (
          <>
            <div className={filtersContainer}>
              <DateSelector clearedFilters={clearedFilters} dates={dates} />
              <FilterData
                duration={duration}
                applyFilters={applyDurationFilter}
                closeAction={removeDurationFilter}
                useDurationFilter={useDurationFilter}
              >
                {points?.length > 1 && (
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
                  filterRecordIds={filterRecordIds}
                  text="Record ID"
                  closeAction={removeRecordIdFilter}
                  applyFilters={applyRecordIdFilter}
                >
                  <RecordIdsFilter
                    filterRecordIds={filterRecordIds}
                    setFilterRecordIds={setFilterRecordIds}
                  />
                </FilterData>
              )}
            </div>
          </>
        )}
        <button
          onClick={clearAllFilters}
          className={clearFilters}
          disabled={points.length === filteredPoints.length}
        >
          REMOVE ALL FILTERS
        </button>
        <PointsInfo />
      </header>
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
