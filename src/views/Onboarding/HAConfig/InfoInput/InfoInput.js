import React from 'react';
import styles from './styles.module.scss';
import { TextInput } from '@wfp/ui';

const InfoInput = ({
  title,
  subtitle,
  id,
  placeholder = null,
  children = null,
  handleChange = null,
  errors,
  register,
}) => {
  return (
    <div className={styles.container}>
      <h3 className={styles.title}>{title}</h3>
      <h4 className={styles.subtitle}>{subtitle}</h4>
      {!children ? (
        <TextInput
          id={id || title}
          name={id || title}
          placeholder={placeholder}
          labelText=""
          onChange={handleChange}
          invalid={!!errors[id || title]}
          inputRef={register({ required: 'Required field' })}
          invalidText={errors[id || title] && errors[id || title].message}
        />
      ) : (
        children
      )}
    </div>
  );
};

export default InfoInput;
