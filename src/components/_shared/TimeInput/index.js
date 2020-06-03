import React from 'react';
import { TextInput } from '@wfp/ui';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/pro-regular-svg-icons';

export default function TimeInput(props) {
  return (
    <TextInput
      additional={
        <div className={styles.icon}>
          <FontAwesomeIcon icon={faClock} />
        </div>
      }
      type="time"
      {...props}
      value={props.value}
      formItemClassName={styles.dateInput}
      /* placeholder=""
    defaultValue="" */
    />
  );
}
