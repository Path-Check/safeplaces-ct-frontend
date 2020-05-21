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
      <td>{staged ? id : <Link to={`${id}`}>{id}</Link>}</td>
      <td>
        <time datetime={updatedAt}>{updatedAt}</time>
      </td>
      <td>{status}</td>
      <td>{expiresIn}</td>
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
