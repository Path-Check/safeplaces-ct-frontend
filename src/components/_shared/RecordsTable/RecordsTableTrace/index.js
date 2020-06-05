import React, { useState } from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import PropTypes from 'prop-types';

import { tableWrapper, table, tableMain } from '../recordsTable.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Modal from 'components/_global/Modal';
import Button from 'components/_shared/Button';
import casesSelectors from 'ducks/cases/selectors';
import applicationSelectors from 'ducks/application/selectors';
import { useSelector, useDispatch } from 'react-redux';
import Record from './Record';
import casesActions from 'ducks/cases/actions';
import applicationActions from 'ducks/application/actions';

const RecordsTableTrace = () => {
  const dispatch = useDispatch();
  const cases = useSelector(state => casesSelectors.getCases(state));
  const status = useSelector(state => applicationSelectors.getStatus(state));

  if (status !== 'CASES ADDED' || !cases || cases.length < 1) {
    return null;
  }

  return (
    <div className={tableWrapper}>
      <table className={table}>
        <thead>
          <tr>
            <th colSpan="1">Record ID</th>
            <th colSpan="2">Last Saved</th>
            <th colSpan="1">Status</th>
            <th colSpan="2">Expires</th>
          </tr>
        </thead>
      </table>
      <div className={tableMain}>
        <table className={table}>
          <tbody>
            {cases.map(r => (
              <Record key={r.caseId} {...r} />
            ))}
          </tbody>
        </table>
      </div>

      <table className={table}>
        <tfoot>
          <tr>
            <td colSpan="4">
              <Button onClick={() => dispatch(casesActions.fetchCase())}>
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
