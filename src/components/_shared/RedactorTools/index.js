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

import { redactorTools } from './RedactorTools.module.scss';

const durationTimes = [10, 15, 30, 45, 60];

const RedactorTools = () => {
  const dispatch = useDispatch();
  const dates = useSelector(state => pointsSelectors.getPointsDates(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const durationStore = useSelector(state =>
    pointsSelectors.getDuration(state),
  );
  const [filterRecordIds, setFilterRecordIds] = useState(false);
  const [duration, setDuration] = useState(durationStore || durationTimes[0]);
  const useDurationFilterStore = useSelector(state =>
    pointsSelectors.getUseDurationFilter(state),
  );
  const [useDurationFilter, setUseDurationFilter] = useState(
    useDurationFilterStore || false,
  );

  const applyFilters = () => {
    dispatch(
      pointsActions.setFilters({
        duration,
        useDurationFilter,
      }),
    );
    setFilterRecordIds(true);
  };

  const handleCheck = e => {
    const checked = e.target.checked;
    setUseDurationFilter(checked);
  };

  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  useEffect(() => {
    setUseDurationFilter(useDurationFilterStore);
  }, [useDurationFilterStore]);

  return (
    <>
      <header className={redactorTools}>
        <RedactorToolsHeader />
        {points?.length > 1 && (
          <>
            <DateSelector dates={dates} />
            <FilterData applyFilters={applyFilters}>
              {isPublish && (
                <RecordIdsFilter
                  filterRecordIds={filterRecordIds}
                  setFilterRecordIds={setFilterRecordIds}
                />
              )}
              {points?.length > 1 && (
                <>
                  <DurationFilter
                    duration={duration}
                    setDuration={setDuration}
                    checked={useDurationFilter}
                    setChecked={handleCheck}
                    times={durationTimes}
                  />
                </>
              )}
            </FilterData>
          </>
        )}
        <PointsInfo />
      </header>
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
