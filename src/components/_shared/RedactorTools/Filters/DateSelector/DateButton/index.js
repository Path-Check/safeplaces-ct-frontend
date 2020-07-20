import React from 'react';
import {
  container,
  button1,
  button2,
  singleButton,
  singleButtonContainer,
  closeButton,
} from './dateButton.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import moment from 'moment';

const DateButton = ({
  date1 = null,
  date2 = null,
  text = null,
  onClick,
  closeAction = () => {},
  removeFilter,
}) => {
  const closeFilter = e => {
    e.stopPropagation();
    closeAction();
  };
  return !text ? (
    <div className={container} onClick={onClick}>
      <span className={button1}>{moment(date1).format('MMM D')}</span>
      <span className={button2}>{moment(date2).format('MMM D')}</span>
    </div>
  ) : (
    <div className={singleButtonContainer} onClick={onClick}>
      <span className={singleButton}>{text}</span>
      {removeFilter && (
        <button type="button" onClick={closeFilter} className={closeButton}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      )}
    </div>
  );
};

export default DateButton;
