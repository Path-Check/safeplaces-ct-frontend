import React from 'react';
import { faPlus } from '@fortawesome/pro-solid-svg-icons';

import PropTypes from 'prop-types';

import { tableWrapper, table } from './recordsTable.module.scss';

import Button from '@wfp/ui/lib/components/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Record from 'components/RecordsTable/Record';
import Modal from 'components/Modals';

const RecordsTable = ({ records }) => {
  if (!records || records.length < 1) {
    return null;
  }

  return (
    <Modal>
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
                <Button
                  onClick={() => console.log('add new case')}
                  iconReverse
                  icon={<FontAwesomeIcon icon={faPlus} />}
                >
                  Add New Case
                </Button>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </Modal>
  );
};

RecordsTable.propTypes = {
  records: PropTypes.array,
};

export default RecordsTable;
