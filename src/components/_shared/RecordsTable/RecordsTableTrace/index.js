import React from 'react';

import { useSelector, useDispatch } from 'react-redux';
import casesSelectors from 'ducks/cases/selectors';
import applicationSelectors from 'ducks/application/selectors';
import casesActions from 'ducks/cases/actions';

import {
  faPlus,
  faArrowUp,
  faArrowDown,
} from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { tableWrapper, table, tableMain } from '../recordsTable.module.scss';

import Button from 'components/_shared/Button';
import Record from './Record';
import { useSortByDate } from 'components/_shared/RecordsTable/useSortBy';

const RecordsTableTrace = () => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getCases(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));
  const [sortItems, sortBy, items] = useSortByDate(cases);

  if (status !== 'CASES ADDED' || !cases || cases.length < 1) {
    return null;
  }

  return (
    <div className={tableWrapper}>
      <table className={table}>
        <thead>
          <tr>
            <th colSpan="2">Record ID</th>
            <th colSpan="2">
              <div>
                Last Saved
                <button onClick={sortItems}>
                  <FontAwesomeIcon
                    icon={sortBy === 'OLDEST' ? faArrowUp : faArrowDown}
                  />
                </button>
              </div>
            </th>
            <th colSpan="1">Status</th>
            <th colSpan="2">Expires</th>
          </tr>
        </thead>
      </table>
      <div className={tableMain}>
        <table className={table}>
          <tbody>
            {items.map(r => (
              <Record key={`case-trace-${r.caseId}`} record={r} />
            ))}
          </tbody>
        </table>
      </div>

      <table className={table}>
        <tfoot>
          <tr>
            <td colSpan="4">
              <Button
                id="add-new-record-from-modal"
                onClick={() => dispatch(casesActions.fetchCase())}
              >
                <FontAwesomeIcon icon={faPlus} /> Add New Record
              </Button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default RecordsTableTrace;
