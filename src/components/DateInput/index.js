import React from 'react';
import { SingleDatePickerInput } from '@wfp/ui';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt, faClock } from '@fortawesome/pro-regular-svg-icons';
import moment from 'moment';

import 'react-dates/initialize';
import { SingleDatePicker, DateRangePicker } from 'react-dates';

export default function DateInput(props) {
  return (
    <div className={styles.dateInput}>
      <SingleDatePickerInput
        style={{ width: '100%' }}
        datePicker={SingleDatePicker}
        customInputIcon={
          <FontAwesomeIcon className={styles.icon} icon={faCalendarAlt} />
        }
        type="date"
        placeholder=""
        defaultValue=""
      />
    </div>
  );
}
