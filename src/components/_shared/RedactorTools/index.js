import React from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import DateSelector from 'components/_shared/RedactorTools/DateSelector';
import FilterData from 'components/_shared/RedactorTools/FilterData';
import DurationFilter from 'components/_shared/RedactorTools/FilterData/DurationFilter';
import TravellingFilter from 'components/_shared/RedactorTools/FilterData/TravellingFilter';
import RecordIdsFilter from 'components/_shared/RedactorTools/FilterData/RecordIdsFilter';
import SelectedDataList from 'components/_shared/SelectedData';
import { useSelector } from 'react-redux';
import pointsSelectors from '../../../ducks/points/selectors';
import applicationSelectors from 'ducks/application/selectors';

const RedactorTools = () => {
  const dates = useSelector(state => pointsSelectors.getPointsDates(state));
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const isPublish =
    useSelector(state => applicationSelectors.getMode(state)) === 'publish';

  return (
    <>
      <RedactorToolsHeader />
      <>
        {points?.length > 1 && <DateSelector dates={dates} />}
        {
          <FilterData>
            {isPublish && <RecordIdsFilter />}
            {/* <DurationFilter />
            <TravellingFilter /> */}
          </FilterData>
        }
      </>
      <SelectedDataList />
    </>
  );
};

export default RedactorTools;
