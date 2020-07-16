import React, { useEffect, useState } from 'react';

import Checkbox from 'components/_shared/ControlledCheckbox/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsActions from 'ducks/points/actions';

const RecordIdsFilter = ({ filterRecordIds }) => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getActiveCases(state));
  const [caseIds, setCaseIds] = useState(cases.map(c => c.caseId));

  useEffect(() => {
    if (filterRecordIds) {
      dispatch(pointsActions.setRecordIds(caseIds));
    }
  }, [filterRecordIds]);

  const handleChange = e => {
    if (caseIds.includes(parseInt(e.target.name))) {
      setCaseIds(caseIds.filter(c => c !== parseInt(e.target.name)));
    } else {
      setCaseIds([...caseIds, parseInt(e.target.name)]);
    }
  };

  return (
    <div>
      {cases?.length > 0 &&
        cases.map(c => (
          <Checkbox
            onChange={handleChange}
            disabled={caseIds.length === 1 && caseIds[0] === c.caseId}
            id={c.caseId}
            name={c.caseId}
            isChecked={caseIds.includes(c.caseId)}
            align="left"
            label={`Record ${c.externalId}`}
          />
        ))}
    </div>
  );
};

export default RecordIdsFilter;
