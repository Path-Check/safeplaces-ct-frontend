import React from 'react';
import styles from './styles.module.scss';
import { TextInput } from '@wfp/ui';

const InfoInput = ({
  title,
  subtitle,
  placeholder = null,
  children = null,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      {!children ? (
        <TextInput id={title} placeholder={placeholder} labelText={null} />
      ) : (
        children
      )}
    </div>
  );
};

export default InfoInput;
