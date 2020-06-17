import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';
import moment from 'moment';

import styles from './record.module.scss';
import { useDispatch } from 'react-redux';
import casesActions from 'ducks/cases/actions';
import { returnFormattedDate } from 'helpers/dateTime';

const Record = ({
  id,
  updated_at,
  updatedAt,
  state,
  expires_at,
  expiresAt,
  onChange,
}) => {
  const dispatch = useDispatch();
  const updateDate = updated_at || updatedAt;
  const expirationDate = expiresAt || expires_at;
  const unpublished = state.toLowerCase() === 'unpublished';
  const updated = returnFormattedDate(updateDate);
  const expires = returnFormattedDate(expirationDate);

  const recordClasses = classNames({
    [`${styles.record}`]: true,
    [`${styles.unpublished}`]: unpublished,
  });

  return (
    <tr className={recordClasses}>
      <td colSpan="1">
        {!unpublished ? (
          id
        ) : (
          <button
            className={styles.recordAction}
            onClick={() => dispatch(casesActions.loadCasePoints(id))}
          >
            {id}
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
