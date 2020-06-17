import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import moment from 'moment';

import styles from './record.module.scss';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';
import { returnFormattedDate } from 'helpers/dateTime';

const friendlyStatuses = {
  published: 'Published',
  unpublished: 'In Progress',
  staging: 'Staged For Publishing',
};

const Record = ({ caseId, updatedAt, state, expiresAt, onChange }) => {
  const dispatch = useDispatch();
  const updateDate = updatedAt;
  const expirationDate = expiresAt;
  const unpublished = state.toLowerCase() === 'unpublished';
  const staged = state.toLowerCase() !== 'unpublished';
  const updated = returnFormattedDate(updateDate);
  const expires = returnFormattedDate(expirationDate);

  const recordClasses = classNames({
    [`${styles.record}`]: true,
    [`${styles.staged}`]: staged,
  });

  return (
    <tr className={recordClasses}>
      {caseId && (
        <td colSpan="1">
          {!unpublished ? (
            caseId
          ) : (
            <button
              className={styles.recordAction}
              onClick={() => dispatch(casesActions.loadCasePoints(caseId))}
            >
              {caseId}
            </button>
          )}
        </td>
      )}
      {updated && (
        <td colSpan="2">
          <time dateTime={updated}>{updated}</time>
        </td>
      )}
      {state && <td colSpan="1">{friendlyStatuses[state]}</td>}
      {expires && <td colSpan="2">{expires}</td>}
    </tr>
  );
};

Record.propTypes = {
  id: PropTypes.number,
  updatedAt: PropTypes.string,
  status: PropTypes.string,
  expiresIn: PropTypes.string,
};

export default Record;
