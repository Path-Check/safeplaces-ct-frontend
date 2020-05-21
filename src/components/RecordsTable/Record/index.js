import React from 'react';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

const Record = ({ id, saved, status, expiration }) => {
  return (
    <tr>
      <td>
        <Link to={`${id}`}>{id}</Link>
      </td>
      <td>
        <time datetime="1987-05-13">{saved}</time>
      </td>
      <td>{status}</td>
      <td>{expiration}</td>
    </tr>
  );
};

Record.propTypes = {
  id: PropTypes.number,
  saved: PropTypes.string,
  status: PropTypes.string,
  expiration: PropTypes.string,
};

export default Record;
