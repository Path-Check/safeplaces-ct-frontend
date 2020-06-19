import React, { useEffect, useState } from 'react';

import Checkbox from 'components/_shared/ControlledCheckbox/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsActions from 'ducks/points/actions';

const RecordIdsFilter = ({ filterRecordIds, setFilterRecordIds }) => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getActiveCase(state));
  const [localCases, setLocalCases] = useState(cases);

  useEffect(() => {
    if (filterRecordIds) {
      dispatch(pointsActions.setRecordIds(localCases));
      setFilterRecordIds(false);
    }
  }, [dispatch, filterRecordIds, localCases, setFilterRecordIds]);

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
