import React, { useState } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { faMapMarkerAlt, faEllipsisV } from '@fortawesome/pro-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  selectedDataItem,
  selectedDataItemHighlighted,
  selectedDataIcon,
  selectedDataContent,
  selectedDataMenuAction,
} from './SelectedDataItem.module.scss';

const SelectedDataItem = ({
  id,
  latLng,
  date,
  time,
  duration,
  travelling,
  hightlightedItem,
}) => {
  const isHighlighted = hightlightedItem === id;
  const [showContentMenu, setShowContentMenu] = useState(false);

  const classes = classNames({
    [`${selectedDataItem}`]: true,
    [`${selectedDataItemHighlighted}`]: isHighlighted,
  });

  const handleClick = () => {
    // fire action to set highlighted point
    // and
    // show content menu
    setShowContentMenu(!showContentMenu);
  };

  return (
    <div className={classes}>
      <FontAwesomeIcon className={selectedDataIcon} icon={faMapMarkerAlt} />
      <div className={selectedDataContent}>
        <h6>{date}</h6>
        <ul>
          <li>{time}</li>
          <li>{travelling ? 'Travelling' : duration}</li>
        </ul>
      </div>
      <button
        className={selectedDataMenuAction}
        type="button"
        onClick={handleClick}
      >
        <FontAwesomeIcon icon={faEllipsisV} />
      </button>
    </div>
  );
};

SelectedDataItem.propTypes = {
  id: PropTypes.string,
  latLng: PropTypes.array,
  date: PropTypes.string,
  time: PropTypes.string,
  duration: PropTypes.bool,
  travelling: PropTypes.string,
  selectedItem: PropTypes.string,
};

export default SelectedDataItem;
