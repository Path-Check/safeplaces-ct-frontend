import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import moment from 'moment';

import styles from './record.module.scss';
import Checkbox from 'components/_shared/Checkbox/Checkbox';

const Record = ({
  id,
  updatedAt,
  state,
  expiresAt,
  onChange,
  processingDate,
  contact_tracer_id,
}) => {
  const processDateFriendly = moment(processingDate).format(
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
      <td colSpan="1">{id}</td>
      <td colSpan="2">
        <time dateTime={processingDate}>{processDateFriendly}</time>
      </td>
      <td colSpan="1">{contact_tracer_id ? `${contact_tracer_id}` : 'N/A'}</td>
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
