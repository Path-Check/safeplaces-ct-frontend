import React, { useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCalendarAlt,
  faClock,
  faHourglass,
} from '@fortawesome/pro-solid-svg-icons';

import { formattedDuration } from 'helpers/dateTime';

import { pointContextMenuHeader } from '../PointContextMenu.module.scss';

const PointContextMenuHeader = ({ time: timestamp, duration }) => {
  const date = moment(timestamp).format('MMMM D, YY');
  const time = moment(timestamp).format('h:mma');

  return (
    <ul className={pointContextMenuHeader}>
      <li>
        <FontAwesomeIcon icon={faCalendarAlt} /> {date}
      </li>
      <li>
        <FontAwesomeIcon icon={faClock} /> {time}
      </li>
      {duration && (
        <li>
          <FontAwesomeIcon icon={faHourglass} /> {formattedDuration(duration)}
        </li>
      )}
    </ul>
  );
};

PointContextMenuHeader.propTypes = {
  duration: PropTypes.number,
  time: PropTypes.string,
};

export default PointContextMenuHeader;
