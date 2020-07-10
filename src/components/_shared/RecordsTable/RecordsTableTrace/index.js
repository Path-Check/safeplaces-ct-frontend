import React, { useState } from 'react';

import moment from 'moment';

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

const RecordsTableTrace = () => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getCases(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));
  const [renderedCases, setRenderedCases] = useState(cases);
  const [sortBy, setSortBy] = useState('NEWEST');

  if (status !== 'CASES ADDED' || !cases || cases.length < 1) {
    return null;
  }

  const sortItems = () => {
    if (sortBy === 'NEWEST') {
      const orderedCases = renderedCases.sort((a, b) => {
        return moment(a.updatedAt) - moment(b.updatedAt);
      });

      setSortBy('OLDEST');
      setRenderedCases(orderedCases);
    } else {
      setSortBy('NEWEST');
      setRenderedCases(
        renderedCases.sort((a, b) => moment(b.updatedAt) - moment(a.updatedAt)),
      );
    }
  };

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
            <th colSpan="2">
              <div>
                Expires
                <button onClick={sortItems}>
                  <FontAwesomeIcon
                    icon={sortBy === 'OLDEST' ? faArrowUp : faArrowDown}
                  />
                </button>
              </div>
            </th>
          </tr>
        </thead>
      </table>
      <div className={tableMain}>
        <table className={table}>
          <tbody>
            {renderedCases.map(r => (
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
