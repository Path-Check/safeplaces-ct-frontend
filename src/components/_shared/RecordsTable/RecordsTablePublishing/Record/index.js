/* eslint-disable camelcase */

import React from 'react';

import classNames from 'classnames';

import moment from 'moment';

import styles from './record.module.scss';
import Checkbox from 'components/_shared/Checkbox/Checkbox';

const Record = ({ id, state, onChange, staged_at, contact_tracer_id }) => {
  const processDateFriendly = moment(staged_at).format(
    'ddd, MMMM D, YYYY - h:ma',
  );

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
        <time dateTime={staged_at}>{processDateFriendly}</time>
      </td>
      <td colSpan="2">{contact_tracer_id ? `${contact_tracer_id}` : 'N/A'}</td>
    </tr>
  );
};

export default Record;
