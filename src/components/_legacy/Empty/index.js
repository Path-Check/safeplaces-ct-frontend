import React from 'react';
import styles from './styles.module.scss';
import classNames from 'classnames';

const Empty = ({ button, className, children, icon, kind, title }) => {
  const emptyClasses = classNames(
    {
      [`${styles.empty}`]: true,
      [`${styles.emptyLarge}`]: kind === 'large',
      [`${styles.emptySection}`]: kind === 'section',
    },
    className,
  );

  return (
    <div className={emptyClasses}>
      <div className={styles.emptyIcon}>{icon}</div>
      <div className={styles.text}>
        {title && <h2>{title}</h2>}
        <p>{children}</p>
      </div>
      <div className={styles.button}>{button}</div>
    </div>
  );
};

export default Empty;
