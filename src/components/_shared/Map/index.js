import React from 'react';

import { useSelector } from 'react-redux';

import pointsSelectors from 'ducks/points/selectors';

import { returnGeoPoints } from 'components/_shared/Map/_helpers';

import MapInner from 'components/_shared/Map/MapInner';

const Map = React.memo(() => {
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );
  const geoPoints = returnGeoPoints(filteredPoints);

  return <MapInner filteredPoints={filteredPoints} geoPoints={geoPoints} />;
});

export default Map;
