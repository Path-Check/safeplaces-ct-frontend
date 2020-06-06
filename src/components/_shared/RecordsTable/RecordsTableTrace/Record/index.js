import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import moment from 'moment';

import styles from './record.module.scss';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';

const Record = ({
  caseId,
  updatedAt,
  state,
  expiresAt,
  isPublishing,
  onChange,
}) => {
  const dispatch = useDispatch();
  const unpublished = state.toLowerCase() === 'unpublished';
  const updated = moment(updatedAt).format('ddd, MMMM D, YYYY - h:ma');
  const expires = moment(expiresAt).format('ddd, MMMM D, YYYY - h:ma');

  const recordClasses = classNames({
    [`${styles.record}`]: true,
    [`${styles.unpublished}`]: unpublished,
  });

  return (
    <tr className={recordClasses}>
      <td colSpan="1">
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
                  state,
                  expiresAt,
                }),
              )
            }
          >
            {caseId}
          </button>
        )}
      </td>
      <td colSpan="2">
        <time dateTime={updated}>{updated}</time>
      </td>
      <td colSpan="1">{state}</td>
      <td colSpan="2">{expires}</td>
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
