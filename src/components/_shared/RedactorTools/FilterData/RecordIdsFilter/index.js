import React, { useEffect, useState } from 'react';

import Checkbox from 'components/_shared/ControlledCheckbox/Checkbox';

import { useDispatch, useSelector } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import pointsActions from 'ducks/points/actions';

const RecordIdsFilter = ({ filterRecordIds, selectAllRecords }) => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getActiveCases(state));
  const [caseIds, setCaseIds] = useState(cases.map(c => c.caseId));

  useEffect(() => {
    if (filterRecordIds) {
      dispatch(pointsActions.setRecordIds(caseIds));
    }
  }, [filterRecordIds]);

  useEffect(() => {
    if (selectAllRecords) {
      setCaseIds(cases.map(c => c.caseId));
    } else {
      setCaseIds([]);
    }
  }, [selectAllRecords]);

  const handleChange = e => {
    if (caseIds.includes(parseInt(e.target.name))) {
      setCaseIds(caseIds.filter(c => c !== parseInt(e.target.name)));
    } else {
      setCaseIds([...caseIds, parseInt(e.target.name)]);
    }
  };

  return (
    <div>
      <h4 style={{ marginBottom: '10px' }}>Records</h4>
      <div style={{ marginBottom: '15px' }}>
        {cases?.length > 0 &&
          cases.map(c => (
            <div style={{ marginBottom: '15px' }}>
              <Checkbox
                isSmall
                onChange={handleChange}
                disabled={caseIds.length === 1 && caseIds[0] === c.caseId}
                id={c.caseId}
                name={c.caseId}
                isChecked={caseIds.includes(c.caseId)}
                align="left"
                label={c.externalId}
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default RecordIdsFilter;
