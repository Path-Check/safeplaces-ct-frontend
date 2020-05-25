import React, { useCallback, useEffect, useRef, useState } from 'react';
import styles from './styles.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/pro-solid-svg-icons';
import Map from 'components/HAConfig/Map';

const MapModal = ({ open }) => {
  const [isOpen, setIsOpen] = useState(open);
  const node = useRef(null);

  const handleClick = useCallback(
    e => {
      if (node && node.current && !node.current.contains(e.target)) {
        setIsOpen(false);
      }
    },
    [node],
  );

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  useEffect(() => {
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [handleClick]);

  useEffect(() => {
    document.addEventListener('keypress', handleClick);
    return () => document.removeEventListener('keypress', handleClick);
  }, [handleClick]);

  return isOpen ? (
    <div className={styles.modal} ref={node}>
      <div className={styles.wrapper}>
        <FontAwesomeIcon
          icon={faTimes}
          className={styles.closeIcon}
          onClick={() => setIsOpen(false)}
        />
        <Map />
      </div>
    </div>
  ) : null;
};

export default MapModal;
