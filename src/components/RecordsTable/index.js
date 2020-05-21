import React from 'react';

import PropTypes from 'prop-types';

import { tableWrapper, table } from './styles.module.scss';

import Record from 'components/RecordsTable/Record';

const RecordsTable = ({ records }) => {
  if (!records || records.length < 1) {
    return null;
  }

  return (
    <div className={tableWrapper}>
      <table className={table}>
        <thead>
          <tr>
            <th>Record ID</th>
            <th>Last Saved</th>
            <th>Status</th>
            <th>Expires In</th>
          </tr>
        </thead>
        <tbody>
          {records.map(r => (
            <Record {...r} />
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colspan="4">
              <button>Add New Case</button>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

RecordsTable.propTypes = {
  records: PropTypes.array,
};

export default RecordsTable;
