import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'classnames';

import { Link } from 'react-router-dom';

import styles from './record.module.scss';

const Record = ({ id, updatedAt, status, expiresIn }) => {
  const staged = status.toLowerCase() === 'staged for publishing';

  const recordClasses = classNames({
    [`${styles.record}`]: true,
    [`${styles.isStaged}`]: staged,
  });

  return (
    <tr className={recordClasses}>
      <td colspan="1">{staged ? id : <Link to={`${id}`}>{id}</Link>}</td>
      <td colspan="2">
        <time datetime={updatedAt}>{updatedAt}</time>
      </td>
      <td colspan="2">{status}</td>
      <td colspan="1">{expiresIn}</td>
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
