/* eslint-disable camelcase */

import React from 'react';

import classNames from 'classnames';

import styles from './record.module.scss';
import Checkbox from 'components/_shared/Checkbox/Checkbox';
import { returnFormattedDate } from 'helpers/dateTime';

const Record = ({
  id,
  state,
  onChange,
  staged_at,
  stagedAt,
  contact_tracer_id,
}) => {
  const processDate = staged_at || stagedAt;
  const processed = returnFormattedDate(processDate);

  const recordClasses = classNames({
    [`${styles.record}`]: true,
  });

  return (
    <tr className={recordClasses}>
      <th colSpan="1">
        <Checkbox id={id} name={id} onChange={onChange} />
      </th>
      <td colSpan="1">
        <label htmlFor={id}>{id}</label>
      </td>
      <td colSpan="2">
        <time dateTime={processed}>{processed}</time>
      </td>
      <td colSpan="2">{contact_tracer_id ? `${contact_tracer_id}` : 'N/A'}</td>
    </tr>
  );
};

export default Record;
