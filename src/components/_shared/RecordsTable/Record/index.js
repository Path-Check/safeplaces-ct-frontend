import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import moment from 'moment';

import { Link } from 'react-router-dom';

import styles from './record.module.scss';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';

const Record = ({ caseId, updatedAt, status, expiresAt }) => {
  const dispatch = useDispatch();
  const unpublished = status.toLowerCase() === 'unpublished';
  const updated = moment(updatedAt).format('ddd, MMMM D, YYYY - h:ma');
  const expires = moment(expiresAt).format('ddd, MMMM D, YYYY - h:ma');

  const recordClasses = classNames({
    [`${styles.record}`]: true,
    [`${styles.unpublished}`]: unpublished,
  });

  return (
    <tr className={recordClasses}>
      <td colspan="1">
        {!unpublished ? (
          caseId
        ) : (
          <button
            className={styles.recordAction}
            onClick={() =>
              dispatch(
                casesActions.loadCasePoints({
                  caseId,
                  updatedAt,
                  status,
                  expiresAt,
                }),
              )
            }
          >
            {caseId}
          </button>
        )}
      </td>
      <td colspan="2">
        <time datetime={updated}>{updated}</time>
      </td>
      <td colspan="1">{status}</td>
      <td colspan="2">{expires}</td>
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
