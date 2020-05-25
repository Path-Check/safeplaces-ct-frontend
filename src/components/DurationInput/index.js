import React from 'react';
import { TextInput } from '@wfp/ui';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHourglassHalf } from '@fortawesome/pro-regular-svg-icons';

export default function DurationInput({ value, ...rest }) {
  return (
    <div className={styles.inputWrapper}>
      <TextInput
        additional={
          <div className={styles.icon}>
            <FontAwesomeIcon icon={faHourglassHalf} />
          </div>
        }
        maxLength={2}
        type="text"
        {...rest}
        labelText={null}
        value={value}
        className={styles.dateInput}
      />
      <span>min.</span>
    </div>
  );
}
