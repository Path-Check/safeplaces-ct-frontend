import React, { useState } from 'react';
import {
  tableWrapper,
  table,
  tableMain,
  tableAction,
} from '../recordsTable.module.scss';

import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector, useDispatch } from 'react-redux';
import Record from './Record';
import casesActions from 'ducks/cases/actions';

const RecordsTablePublishing = ({ isPublishing }) => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getCases(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));
  const [caseIds, setCaseIds] = useState([]);

  if (status !== 'CASES ADDED' || !cases || cases.length < 1) {
    return null;
  }

  const stagedCases = cases.filter(c => c.state === 'staging');

  const handleChange = (checked, e) => {
    const caseId = e.target.id;
    let ids = [];

    if (caseIds.includes(caseId)) {
      ids = caseIds.filter(id => id !== caseId);
    } else {
      ids = [...caseIds, caseId];
    }

    setCaseIds(ids);
  };

  return (
    <div className={tableWrapper}>
      <table className={table}>
        <thead>
          <tr>
            <th colSpan="1">Select</th>
            <th colSpan="1">Record ID</th>
            <th colSpan="2">Processing Date</th>
            <th colSpan="1">Contact Tracer ID</th>
          </tr>
        </thead>
      </table>
      <div className={tableMain}>
        <table className={table}>
          <tbody>
            {stagedCases.map(r => (
              <Record key={r.caseId} {...r} onChange={handleChange} />
            ))}
          </tbody>
        </table>
      </div>

      <table className={table}>
        <tfoot>
          <tr>
            <td colSpan="4">
              <>
                <Button
                  className={tableAction}
                  disabled={caseIds.length < 1}
                  onClick={() =>
                    dispatch(casesActions.loadMultiCasePoints(caseIds))
                  }
                >
                  Open Selected Data
                </Button>
                {caseIds.length > 0 && <span>{caseIds.length} Selected</span>}
              </>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RecordsTablePublishing;
