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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/pro-solid-svg-icons';
import { useSortByDate } from 'components/_shared/RecordsTable/useSortBy';

const RecordsTablePublishing = ({ isPublishing }) => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getCases(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));
  const [caseIds, setCaseIds] = useState([]);
  const [sortItems, sortBy, items] = useSortByDate(
    cases.filter(c => c.state === 'staging'),
  );

  if (status !== 'CASES ADDED' || !cases || cases.length < 1) {
    return null;
  }

  const handleChange = (checked, e) => {
    const caseId = parseInt(e.target.id, 10);
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
            <th colSpan="1" style={{ textAlign: 'center' }}>
              Select
            </th>
            <th colSpan="2">Record ID</th>
            <th colSpan="2">
              <div>
                Processing Date
                <button onClick={sortItems}>
                  <FontAwesomeIcon
                    icon={sortBy === 'OLDEST' ? faArrowUp : faArrowDown}
                  />
                </button>
              </div>
            </th>
            <th colSpan="2">Contact Tracer ID</th>
          </tr>
        </thead>
      </table>
      <div className={tableMain}>
        <table id="records-table" className={table}>
          <tbody>
            {items.map(r => (
              <Record
                key={`case-pub-${r.caseId}`}
                {...r}
                onChange={handleChange}
              />
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
                  id="open-selected-data"
                  className={tableAction}
                  disabled={caseIds.length < 1}
                  onClick={() =>
                    dispatch(
                      casesActions.loadMultiCasePoints(
                        cases.filter(c => caseIds.includes(c.caseId)),
                      ),
                    )
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
