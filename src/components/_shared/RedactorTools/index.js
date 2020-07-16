import React from 'react';

import RedactorToolsHeader from 'components/_shared/RedactorTools/Header';
import SelectedDataList from 'components/_shared/SelectedData';
import { useSelector } from 'react-redux';
import { getFilteredPoints, getPoints } from '../../../ducks/points/selectors';
import PointsInfo from 'components/_shared/RedactorTools/PointsInfo';

import { redactorTools } from './RedactorTools.module.scss';

import Filters from 'components/_shared/RedactorTools/Filters';
import ErrorBoundary from 'components/_global/errorBoundary';

const RedactorTools = React.memo(() => {
  const filteredPoints = useSelector(getFilteredPoints);
  const points = useSelector(getPoints);

  return (
    <>
      <header className={redactorTools}>
        <RedactorToolsHeader />
        {/* {points?.length > 1 && (
          <ErrorBoundary>
            <Filters
              filteredPointsLength={filteredPoints?.length}
              pointsLength={points?.length}
            />
          </ErrorBoundary>
        )} */}
        <PointsInfo />
      </header>
      <SelectedDataList filteredPoints={filteredPoints} />
    </>
  );
});

export default RedactorTools;
