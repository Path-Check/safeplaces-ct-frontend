import React, { useState, useEffect } from 'react';

import Checkbox from 'components/_shared/ControlledCheckbox/Checkbox';
import pointsSelectors from 'ducks/points/selectors';

import { useSelector, useDispatch } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsActions from 'ducks/points/actions';

const RecordIdsFilter = () => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getActiveCase(state));
  const [localCases, setLocalCases] = useState(cases);
  const points = useSelector(state => pointsSelectors.getPoints(state));
  const filteredPoints = useSelector(state =>
    pointsSelectors.getFilteredPoints(state),
  );

  useEffect(() => {
    if (localCases.length === cases.length) {
      dispatch(pointsActions.setFilteredPoints([]));
    } else {
      dispatch(
        pointsActions.setFilteredPoints(
          points.filter(({ caseId }) => localCases.includes(caseId)),
        ),
      );
    }
  }, [localCases]);

  useEffect(() => {
    if (filteredPoints.length < 1) {
      setLocalCases(cases);
    }
  }, [filteredPoints]);

  const handleChange = e => {
    if (localCases.includes(parseInt(e.target.name))) {
      setLocalCases(localCases.filter(c => c !== parseInt(e.target.name)));
    } else {
      setLocalCases([...localCases, parseInt(e.target.name)]);
    }
  };

  return (
    <div>
      {cases?.map(record => (
        <Checkbox
          onChange={handleChange}
          disabled={localCases.length === 1 && localCases[0] === record}
          id={record}
          name={record}
          isChecked={localCases.includes(record)}
          align="left"
          label={`Record ${record}`}
        />
      ))}
    </div>
  );
};

export default RecordIdsFilter;
