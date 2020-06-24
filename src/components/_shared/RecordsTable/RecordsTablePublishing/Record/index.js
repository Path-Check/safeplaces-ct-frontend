/* eslint-disable camelcase */

import React from 'react';

import classNames from 'classnames';

import styles from './record.module.scss';
import Checkbox from 'components/_shared/Checkbox/Checkbox';
import { returnFormattedDate } from 'helpers/dateTime';

const Record = ({
  caseId,
  state,
  externalId,
  onChange,
  stagedAt,
  contactTracerId,
}) => {
  const processDate = stagedAt;
  const processed = returnFormattedDate(processDate);
  const _Id = externalId || caseId;

  const recordClasses = classNames({
    [`${styles.record}`]: true,
  });

  return (
    <tr className={recordClasses}>
      {caseId && (
        <>
          <th colSpan="1">
            <Checkbox id={caseId} name={caseId} onChange={onChange} />
          </th>
          <td colSpan="2">
            <label title={_Id} htmlFor={caseId}>
              {_Id}
            </label>
          </td>
        </>
      )}
      <td colSpan="2">
        <time dateTime={processed}>{processed}</time>
      </td>
      <td colSpan="2">{contactTracerId ? `${contactTracerId}` : 'N/A'}</td>
    </tr>
  );
};

export default Record;
