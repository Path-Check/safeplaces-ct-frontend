import React, { useState } from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';
import FilterData from 'components/_shared/RedactorTools/FilterData';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';
import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import RecordIdsFilter from 'components/_shared/RedactorTools/FilterData/RecordIdsFilter';
import SelectedDataList from 'components/_shared/SelectedData';
import { useDispatch, useSelector } from 'react-redux';
import pointsSelectors from '../../../ducks/points/selectors';
import pointsActions from 'ducks/points/actions';
import applicationSelectors from 'ducks/application/selectors';

const durationTimes = [10, 15, 30, 45, 60];

const RedactorTools = () => {
  const dispatch = useDispatch();
  const dates = useSelector(state => pointsSelectors.getPointsDates(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const durationStore = useSelector(state =>
    pointsSelectors.getDuration(state),
  );
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
  };

  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  return (
    <>
      <RedactorToolsHeader />
      {points?.length > 1 && (
        <>
          <DateSelector dates={dates} />
          <FilterData applyFilters={applyFilters}>
            {isPublish && <RecordIdsFilter />}
            {points?.length > 1 && (
              <>
                <DurationFilter
                  duration={duration}
                  setDuration={setDuration}
                  checked={useDurationFilter}
                  setChecked={setUseDurationFilter}
                  times={durationTimes}
                />
                <TravellingFilter />
              </>
            )}
          </FilterData>
        </>
      )}
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
